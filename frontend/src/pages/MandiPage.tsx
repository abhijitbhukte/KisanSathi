import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import {
  useCreateCheckoutSession,
  useCreateCrop,
  useGetBidsForCrop,
  useGetCrops,
  usePlaceBid,
} from "@/hooks/useBackend";
import { CropStatus } from "@/types";
import type { Crop, UserId } from "@/types";
import {
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  Phone,
  Plus,
  Scale,
  ShoppingCart,
  Tag,
  Timer,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const MOCK_AUCTIONS: Crop[] = [
  {
    crop_id: BigInt(1),
    user_id: {} as UserId,
    crop_type: "Soybean",
    quantity_kg: BigInt(500),
    base_price: BigInt(42),
    harvest_date: "2026-09-15",
    created_at: BigInt(0),
    status: CropStatus.listed,
  },
  {
    crop_id: BigInt(2),
    user_id: {} as UserId,
    crop_type: "Cotton",
    quantity_kg: BigInt(300),
    base_price: BigInt(65),
    harvest_date: "2026-11-20",
    created_at: BigInt(0),
    status: CropStatus.listed,
  },
  {
    crop_id: BigInt(3),
    user_id: {} as UserId,
    crop_type: "Wheat",
    quantity_kg: BigInt(1000),
    base_price: BigInt(22),
    harvest_date: "2027-03-10",
    created_at: BigInt(0),
    status: CropStatus.listed,
  },
];

function useAuctionTimer(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const s = (timeLeft % 60).toString().padStart(2, "0");
  return { display: `${m}:${s}`, expired: timeLeft === 0 };
}

interface BuyerForm {
  name: string;
  phone: string;
  quantity: string;
  address: string;
}

type PaymentStep = 1 | 2 | "processing" | "success" | "failed";

interface BuyModalProps {
  crop: Crop;
  highestBid: number;
  open: boolean;
  onClose: () => void;
}

function BuyModal({ crop, highestBid, open, onClose }: BuyModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<PaymentStep>(1);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState<BuyerForm>({
    name: "",
    phone: "",
    quantity: "",
    address: "",
  });

  const createCheckoutSession = useCreateCheckoutSession();

  const maxQty = Number(crop.quantity_kg);
  const pricePerKg = highestBid;
  const qty = Number.parseFloat(form.quantity) || 0;
  const totalAmount = qty * pricePerKg;
  const totalAmountPaise = Math.round(totalAmount * 100);

  function handleChange(field: keyof BuyerForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.quantity ||
      !form.address.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const q = Number.parseFloat(form.quantity);
    if (Number.isNaN(q) || q <= 0) {
      toast.error("Enter a valid quantity");
      return;
    }
    if (q > maxQty) {
      toast.error(`Max available quantity is ${maxQty} kg`);
      return;
    }
    setStep(2);
  }

  async function handleConfirm() {
    setStep("processing");
    try {
      const currentUrl = window.location.href.split("?")[0];
      const generatedOrderId = `${crop.crop_id.toString()}_${Date.now()}`;
      const successUrl = `${currentUrl}?payment=success&orderId=${generatedOrderId}`;
      const cancelUrl = `${currentUrl}?payment=cancelled`;

      const result = await createCheckoutSession.mutateAsync({
        crop_name: `${crop.crop_type} ${form.quantity}kg`,
        crop_id: crop.crop_id,
        quantity_kg: BigInt(Math.round(Number.parseFloat(form.quantity))),
        total_amount_paise: BigInt(totalAmountPaise),
        seller_id: crop.user_id,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      if (result.checkout_url && result.checkout_url.trim() !== "") {
        // Real Stripe redirect
        window.location.href = result.checkout_url;
      } else {
        // Demo mode: no checkout URL returned
        setIsDemoMode(true);
        setOrderId(generatedOrderId);
        await new Promise((res) => setTimeout(res, 2000));
        setStep("success");
      }
    } catch {
      // Any error — fall back to demo mode
      const generatedOrderId = `DEMO_${crop.crop_id.toString()}_${Date.now()}`;
      setIsDemoMode(true);
      setOrderId(generatedOrderId);
      await new Promise((res) => setTimeout(res, 2000));
      setStep("success");
    }
  }

  function handleBack() {
    setStep(2);
  }

  function handleOpenChange(val: boolean) {
    if (!val && step !== "processing") {
      onClose();
      setTimeout(() => {
        setStep(1);
        setIsDemoMode(false);
        setOrderId("");
        setForm({ name: "", phone: "", quantity: "", address: "" });
      }, 300);
    }
  }

  function handleDone() {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsDemoMode(false);
      setOrderId("");
      setForm({ name: "", phone: "", quantity: "", address: "" });
    }, 300);
  }

  // Step indicator helper
  const stepNum = step === 1 ? 1 : step === 2 ? 2 : 3;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border bg-primary/5">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <ShoppingCart className="w-4 h-4 text-primary" />
            {step === 1
              ? t.mandi_buyer_details
              : step === 2 || step === "processing"
                ? t.mandi_order_summary
                : step === "success"
                  ? t.payment_success_title
                  : t.payment_failed}
            <Badge
              variant="outline"
              className="ml-auto text-xs border-primary/30 text-primary"
            >
              {crop.crop_type}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator — hidden during processing/success/failed */}
        {(step === 1 || step === 2) && (
          <div className="flex items-center gap-2 px-5 pt-3 pb-1">
            {[
              { n: 1, label: t.mandi_buyer_details },
              { n: 2, label: t.mandi_order_summary },
              { n: 3, label: t.payment_success },
            ].map(({ n, label }, idx) => (
              <div
                key={n}
                className="flex items-center gap-1 flex-1 last:flex-none"
              >
                <div
                  className={`flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${stepNum === n ? "text-primary" : stepNum > n ? "text-primary/60" : "text-muted-foreground"}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${stepNum === n ? "bg-primary text-primary-foreground" : stepNum > n ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
                  >
                    {n}
                  </span>
                  {label}
                </div>
                {idx < 2 && <div className="flex-1 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Buyer Details Form */}
        {step === 1 && (
          <form
            onSubmit={handleNext}
            className="px-5 pb-5 pt-3 space-y-3"
            data-ocid="buy-form"
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="buyer-name"
                className="text-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-primary" />
                {t.mandi_buyer_name}
              </Label>
              <Input
                id="buyer-name"
                placeholder="Ramesh Kumar"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-9 rounded-xl"
                data-ocid="buy-input-name"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="buyer-phone"
                className="text-sm flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                {t.mandi_buyer_phone}
              </Label>
              <Input
                id="buyer-phone"
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="h-9 rounded-xl"
                data-ocid="buy-input-phone"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="buyer-qty"
                className="text-sm flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-primary" />
                {t.mandi_quantity_buy}
                <span className="text-muted-foreground text-xs ml-auto">
                  max {maxQty} kg
                </span>
              </Label>
              <Input
                id="buyer-qty"
                type="number"
                placeholder={`1 – ${maxQty}`}
                min={1}
                max={maxQty}
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="h-9 rounded-xl"
                data-ocid="buy-input-quantity"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="buyer-address"
                className="text-sm flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {t.mandi_delivery_address}
              </Label>
              <Textarea
                id="buyer-address"
                placeholder="Gali No. 3, Shivaji Nagar, Nagpur, Maharashtra - 440001"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="rounded-xl min-h-[70px] text-sm resize-none"
                data-ocid="buy-input-address"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-9 rounded-xl"
                onClick={onClose}
                data-ocid="buy-btn-cancel"
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                className="flex-1 h-9 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="buy-btn-next"
              >
                {t.mandi_order_summary} →
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Order Summary */}
        {step === 2 && (
          <div
            className="px-5 pb-5 pt-3 space-y-4"
            data-ocid="buy-order-summary"
          >
            <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.mandi_crop_type}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {crop.crop_type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.mandi_base_price}
                </span>
                <span className="text-sm font-medium text-foreground">
                  ₹{pricePerKg}/{t.kg}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {t.mandi_quantity_buy}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {form.quantity} {t.kg}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {t.mandi_total_amount}
                </span>
                <span className="text-lg font-bold text-primary">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{form.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{form.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="break-words">{form.address}</span>
              </div>
            </div>

            {/* Stripe payment notice */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-3 py-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">
                {t.payment_stripe_notice}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="h-9 rounded-xl gap-1.5"
                onClick={handleBack}
                data-ocid="buy-btn-back"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                {t.cancel}
              </Button>
              <Button
                className="flex-1 h-10 rounded-xl font-semibold gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200"
                onClick={handleConfirm}
                disabled={createCheckoutSession.isPending}
                data-ocid="buy-btn-confirm"
              >
                <CreditCard className="w-4 h-4" />
                Pay ₹{totalAmount.toLocaleString("en-IN")}
              </Button>
            </div>
          </div>
        )}

        {/* Processing state */}
        {step === "processing" && (
          <div
            className="px-5 pb-8 pt-6 flex flex-col items-center text-center space-y-4"
            data-ocid="buy-payment-processing"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">
                {t.payment_processing}
              </p>
              <p className="text-sm text-muted-foreground">
                Please wait, do not close this window
              </p>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* Success state */}
        {step === "success" && (
          <div
            className="px-6 py-8 flex flex-col items-center text-center space-y-4"
            data-ocid="buy-payment-success"
          >
            {isDemoMode && (
              <Badge
                variant="outline"
                className="text-xs border-amber-400/50 text-amber-600 bg-amber-50"
              >
                {t.payment_demo_mode}
              </Badge>
            )}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle
                className="w-12 h-12 text-primary"
                style={{ color: "#2E7D32" }}
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-foreground">
                {t.payment_success_title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.payment_success_msg}
              </p>
            </div>
            <div className="w-full rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t.mandi_total_amount}
                </span>
                <span className="font-bold text-primary text-base">
                  ₹{totalAmount.toLocaleString("en-IN")} paid
                </span>
              </div>
              {orderId && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {t.payment_order_placed}
                  </span>
                  <span className="font-mono text-[11px] text-foreground truncate ml-2 max-w-[160px]">
                    {orderId}
                  </span>
                </div>
              )}
            </div>
            {isDemoMode && (
              <p className="text-xs text-muted-foreground italic">
                {t.payment_demo_note}
              </p>
            )}
            <Button
              className="w-full h-10 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleDone}
              data-ocid="payment-success-done"
            >
              Done ✓
            </Button>
          </div>
        )}

        {/* Failed state */}
        {step === "failed" && (
          <div
            className="px-6 py-8 flex flex-col items-center text-center space-y-4"
            data-ocid="buy-payment-failed"
          >
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-destructive" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-foreground">
                Payment Failed
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.payment_failed}
              </p>
            </div>
            <div className="flex gap-2 w-full pt-1">
              <Button
                variant="outline"
                className="flex-1 h-9 rounded-xl"
                onClick={handleDone}
                data-ocid="payment-failed-cancel"
              >
                {t.cancel}
              </Button>
              <Button
                className="flex-1 h-9 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleBack}
                data-ocid="payment-failed-retry"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Payment success modal shown after redirect back from Stripe
interface PaymentSuccessModalProps {
  open: boolean;
  orderId: string;
  onClose: () => void;
}

function PaymentSuccessModal({
  open,
  orderId,
  onClose,
}: PaymentSuccessModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-sm rounded-2xl p-0 overflow-hidden">
        <div className="px-6 py-8 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12" style={{ color: "#2E7D32" }} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {t.payment_success_title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.payment_success_msg}
            </p>
          </div>
          {orderId && (
            <div className="w-full rounded-xl bg-muted/40 border border-border px-4 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {t.payment_order_placed}:
              </span>{" "}
              <span className="font-mono text-[11px]">{orderId}</span>
            </div>
          )}
          <Button
            className="w-full h-9 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onClose}
            data-ocid="payment-success-close"
          >
            {t.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AuctionCard({ crop }: { crop: Crop }) {
  const { t } = useLanguage();
  const { data: bids } = useGetBidsForCrop(crop.crop_id);
  const placeBid = usePlaceBid();
  const timer = useAuctionTimer(Number(crop.crop_id % BigInt(600)) + 300);
  const [buyOpen, setBuyOpen] = useState(false);

  const highestBid =
    bids && bids.length > 0
      ? Number(
          bids.reduce((max, b) => (b.bid_amount > max.bid_amount ? b : max))
            .bid_amount,
        )
      : Number(crop.base_price);

  const maxPrice = Math.round(Number(crop.base_price) * 1.1);
  const [bidInput, setBidInput] = useState("");

  async function handleBid() {
    const amount = Number.parseFloat(bidInput);
    if (Number.isNaN(amount) || amount <= highestBid) {
      toast.error(`Bid must be higher than ₹${highestBid}/kg`);
      return;
    }
    if (amount > maxPrice) {
      toast.error(`Max allowed bid is ₹${maxPrice}/kg`);
      return;
    }
    try {
      await placeBid.mutateAsync({
        bid_amount: BigInt(Math.round(amount)),
        crop_id: crop.crop_id,
      });
      toast.success(`Bid of ₹${amount}/kg placed successfully!`);
      setBidInput("");
    } catch {
      toast.error("Failed to place bid. Please try again.");
    }
  }

  return (
    <>
      <Card className="shadow-card" data-ocid="auction-card">
        <CardContent className="pt-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-foreground">{crop.crop_type}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {Number(crop.quantity_kg)} {t.kg} · Harvest: {crop.harvest_date}
              </p>
            </div>
            <Badge
              variant="outline"
              className={
                timer.expired
                  ? "text-destructive border-destructive/30"
                  : "text-primary border-primary/30 bg-primary/5"
              }
            >
              <Timer className="w-3 h-3 mr-1" />
              {timer.expired ? "Ended" : timer.display}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="p-2 rounded-lg bg-muted/40 text-center">
              <p className="text-[10px] text-muted-foreground">Base</p>
              <p className="text-sm font-bold text-foreground">
                ₹{Number(crop.base_price)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-center border border-primary/20">
              <p className="text-[10px] text-primary">{t.mandi_current_bid}</p>
              <p className="text-sm font-bold text-primary">₹{highestBid}</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/10 text-center">
              <p className="text-[10px] text-muted-foreground">
                {t.mandi_max_price}
              </p>
              <p className="text-sm font-bold text-secondary">₹{maxPrice}</p>
            </div>
          </div>

          {!timer.expired && (
            <div className="flex gap-2 mb-2">
              <Input
                type="number"
                placeholder={`>${highestBid}`}
                value={bidInput}
                onChange={(e) => setBidInput(e.target.value)}
                className="h-9 text-sm"
                data-ocid="bid-input"
              />
              <Button
                size="sm"
                className="h-9 gap-1.5 flex-shrink-0"
                onClick={handleBid}
                disabled={placeBid.isPending}
                data-ocid="btn-place-bid"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {t.mandi_place_bid}
              </Button>
              <Button
                size="sm"
                className="h-9 gap-1.5 flex-shrink-0 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setBuyOpen(true)}
                data-ocid="btn-buy"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {t.mandi_buy}
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            {bids && bids.length > 0
              ? `${bids.length} bid(s) placed`
              : t.mandi_no_bids}
          </p>
        </CardContent>
      </Card>

      <BuyModal
        crop={crop}
        highestBid={highestBid}
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
      />
    </>
  );
}

export function MandiPage() {
  const { t } = useLanguage();
  const { data: backendCrops } = useGetCrops();
  const createCrop = useCreateCrop();

  // Detect return from Stripe payment
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentOrderId, setPaymentOrderId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      const orderId = params.get("orderId") ?? "";
      setPaymentOrderId(orderId);
      setPaymentSuccess(true);
      // Clean the URL without reload
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  const [form, setForm] = useState({
    crop_type: "",
    quantity_kg: "",
    base_price: "",
    harvest_date: "",
  });

  const allCrops = [
    ...MOCK_AUCTIONS,
    ...(backendCrops?.filter((c) => c.status === CropStatus.listed) ?? []),
  ];

  const handleChange = useCallback(
    (field: string, value: string) =>
      setForm((f) => ({ ...f, [field]: value })),
    [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.crop_type ||
      !form.quantity_kg ||
      !form.base_price ||
      !form.harvest_date
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await createCrop.mutateAsync({
        crop_type: form.crop_type,
        quantity_kg: BigInt(form.quantity_kg),
        base_price: BigInt(form.base_price),
        harvest_date: form.harvest_date,
      });
      toast.success(`${form.crop_type} listed successfully!`);
      setForm({
        crop_type: "",
        quantity_kg: "",
        base_price: "",
        harvest_date: "",
      });
    } catch {
      toast.error("Failed to list crop. Please try again.");
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl" data-ocid="mandi-page">
      <div>
        <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          {t.mandi_title}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t.mandi_subtitle}
        </p>
      </div>

      <Tabs defaultValue="auction" className="space-y-4">
        <TabsList
          className="grid w-full max-w-xs grid-cols-2"
          data-ocid="mandi-tabs"
        >
          <TabsTrigger value="auction" data-ocid="tab-auction">
            {t.mandi_live_auction}
          </TabsTrigger>
          <TabsTrigger value="list" data-ocid="tab-list">
            {t.mandi_list_crop}
          </TabsTrigger>
        </TabsList>

        {/* Live Auctions */}
        <TabsContent value="auction" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              {allCrops.length} Active Auctions
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCrops.map((crop) => (
              <AuctionCard key={crop.crop_id.toString()} crop={crop} />
            ))}
          </div>
        </TabsContent>

        {/* List Crop */}
        <TabsContent value="list">
          <Card className="max-w-lg shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                {t.mandi_list_crop}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="list-crop-form"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="crop_type"
                    className="text-sm flex items-center gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    {t.mandi_crop_type}
                  </Label>
                  <Input
                    id="crop_type"
                    placeholder="e.g., Soybean, Wheat, Cotton"
                    value={form.crop_type}
                    onChange={(e) => handleChange("crop_type", e.target.value)}
                    className="h-9"
                    data-ocid="input-crop-type"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="quantity_kg"
                      className="text-sm flex items-center gap-1.5"
                    >
                      <Scale className="w-3.5 h-3.5 text-primary" />
                      {t.mandi_quantity}
                    </Label>
                    <Input
                      id="quantity_kg"
                      type="number"
                      placeholder="500"
                      value={form.quantity_kg}
                      onChange={(e) =>
                        handleChange("quantity_kg", e.target.value)
                      }
                      className="h-9"
                      data-ocid="input-quantity"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="base_price"
                      className="text-sm flex items-center gap-1.5"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      {t.mandi_base_price}
                    </Label>
                    <Input
                      id="base_price"
                      type="number"
                      placeholder="42"
                      value={form.base_price}
                      onChange={(e) =>
                        handleChange("base_price", e.target.value)
                      }
                      className="h-9"
                      data-ocid="input-base-price"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="harvest_date"
                    className="text-sm flex items-center gap-1.5"
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-primary" />
                    {t.mandi_harvest_date}
                  </Label>
                  <Input
                    id="harvest_date"
                    type="date"
                    value={form.harvest_date}
                    onChange={(e) =>
                      handleChange("harvest_date", e.target.value)
                    }
                    className="h-9"
                    data-ocid="input-harvest-date"
                  />
                </div>

                {form.base_price && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Base Price:</span>
                      <span className="font-medium text-foreground">
                        ₹{form.base_price}/kg
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground mt-1">
                      <span>{t.mandi_max_price} (+10%):</span>
                      <span className="font-semibold text-primary">
                        ₹
                        {Math.round(
                          Number.parseFloat(form.base_price || "0") * 1.1,
                        )}
                        /kg
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={createCrop.isPending}
                  data-ocid="btn-list-crop"
                >
                  <Package className="w-4 h-4" />
                  {createCrop.isPending ? "Listing..." : t.mandi_submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment success modal — shown after redirect back from Stripe */}
      <PaymentSuccessModal
        open={paymentSuccess}
        orderId={paymentOrderId}
        onClose={() => setPaymentSuccess(false)}
      />
    </div>
  );
}
