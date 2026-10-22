"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Gift, Heart, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/data/types";
import { formatKES } from "@/lib/formatters";
import { getGiftBuilderExtras, getGiftBuilderVessels } from "@/lib/repositories";
import { useShopStore } from "@/features/cart/store";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge, Chip } from "@/components/ui/badge";
import { HangTagPrice } from "@/components/ui/hang-tag-price";
import { Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const WRAPPING_STYLES = [
  {
    id: "blush-bow",
    name: "Blush Polka Tissue + Satin Bow",
    description: "Pink polka-dot tissue paper tied with a double bubblegum ribbon",
    price: 200,
  },
  {
    id: "lavender-keepsake",
    name: "Lavender Keepsake Box + Gold Heart Seal",
    description: "Rigid pastel keepsake box with lavender crinkle fill & bow card",
    price: 300,
  },
  {
    id: "butter-sunshine",
    name: "Sunshine Butter Wrap + Daisy Sticker",
    description: "Warm butter-yellow tissue with a cheerful bow tag",
    price: 200,
  },
] as const;

export function GiftBuilderView() {
  const vessels = React.useMemo(() => getGiftBuilderVessels(), []);
  const extras = React.useMemo(() => getGiftBuilderExtras(), []);
  const addItem = useShopStore((s) => s.addItem);
  const setBagOpen = useShopStore((s) => s.setBagOpen);

  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [selectedVessel, setSelectedVessel] = React.useState<Product>(() => vessels[0]!);
  const [selectedExtras, setSelectedExtras] = React.useState<Product[]>(() => extras.slice(0, 1));
  const [selectedWrapId, setSelectedWrapId] = React.useState<string>(WRAPPING_STYLES[0].id);
  const [recipientName, setRecipientName] = React.useState("");
  const [noteMessage, setNoteMessage] = React.useState("");

  const selectedWrap = WRAPPING_STYLES.find((w) => w.id === selectedWrapId) ?? WRAPPING_STYLES[0];

  function handleToggleExtra(item: Product) {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.slug === item.slug);
      if (exists) {
        return prev.filter((e) => e.slug !== item.slug);
      }
      if (prev.length >= 2) {
        toast.info("Pick up to 2 cute extras for your bundle! Swap one out first.");
        return [prev[1]!, item];
      }
      return [...prev, item];
    });
  }

  const rawBundleTotal =
    selectedVessel.price + selectedExtras.reduce((sum, e) => sum + e.price, 0) + selectedWrap.price;
  const discountedBundleTotal = Math.round(rawBundleTotal * 0.9); // 10% bundle discount

  function handleAddBundleToBag() {
    const extrasNames =
      selectedExtras.length > 0 ? selectedExtras.map((e) => e.name).join(" + ") : "No extras";
    const summaryVariant = `${selectedVessel.name} + ${extrasNames} (${selectedWrap.name})`;
    const formattedNote = [
      recipientName.trim() ? `To: ${recipientName.trim()}` : "",
      noteMessage.trim(),
    ]
      .filter(Boolean)
      .join(" — ");

    addItem({
      slug: "little-joy-gift-bundle",
      name: "Custom Whimsy Gift Box",
      price: discountedBundleTotal,
      quantity: 1,
      variant: summaryVariant,
      giftNote: formattedNote || "Wrapped with a Whimsy bow! 🎀",
      illustration: "gift-bundle",
      backdrop: "butter",
    });

    toast.success("Hooray! Added your custom Gift Box to your bag (-10% saved!) 🎀");
    setBagOpen(true);
  }

  return (
    <div className="pb-16">
      <section className="bg-butter/55 border-plum/15 border-b py-10 md:py-14">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <Badge variant="sale">Bundle & Save 10% Automatically 💝</Badge>
              <h1 className="font-display text-plum text-h1 mt-2 font-bold">
                Custom Gift Box Builder
              </h1>
              <p className="text-plum/85 text-body mt-1 font-medium">
                Create a one-of-a-kind pastel surprise in 3 joyful steps: choose a vessel, tuck in 1
                or 2 little extras, and pick your wrapping & note card.
              </p>
            </div>
            <BowMascot mood="happy" size="lg" />
          </div>
        </div>
      </section>
      <ScallopDivider fill="cream" />

      <div className="mx-auto mt-6 max-w-(--spacing-container) px-4 sm:px-6">
        {/* Step Switcher Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2.5">
          <Chip selected={step === 1} onClick={() => setStep(1)}>
            1. Choose a Vessel ({selectedVessel.name})
          </Chip>
          <Chip selected={step === 2} onClick={() => setStep(2)}>
            2. Add 1–2 Little Extras ({selectedExtras.length}/2 selected)
          </Chip>
          <Chip selected={step === 3} onClick={() => setStep(3)}>
            3. Pick Wrapping & Note Card
          </Chip>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Stepper Selection */}
          <div className="space-y-6 lg:col-span-7">
            {step === 1 && (
              <section
                aria-labelledby="gb-step-1"
                className="rounded-feature border-plum shadow-sticker space-y-5 border-2 bg-white p-6"
              >
                <div>
                  <Badge variant="lavender">Step 1 of 3</Badge>
                  <h2 id="gb-step-1" className="font-display text-plum text-h2 mt-1 font-bold">
                    Pick Your Main Gift Vessel
                  </h2>
                  <p className="text-soft-plum text-small">
                    Start with a pastel bag, ceramic mug, or quilted pouch as the star of your gift
                    box.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vessels.map((vessel) => {
                    const isSelected = vessel.slug === selectedVessel.slug;
                    return (
                      <button
                        key={vessel.slug}
                        type="button"
                        onClick={() => setSelectedVessel(vessel)}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex flex-col justify-between rounded-2xl border-2 p-3.5 text-left transition-all",
                          isSelected
                            ? "border-plum bg-blush/45 shadow-[0_4px_0_#4A3552]"
                            : "border-plum/25 hover:border-plum bg-white",
                        )}
                      >
                        <div>
                          <ProductIllustration
                            kind={vessel.illustration}
                            backdrop={vessel.backdrop}
                            alt={vessel.name}
                            className="aspect-4/3"
                          />
                          <h3 className="font-display text-plum mt-3 text-base font-bold">
                            {vessel.name}
                          </h3>
                          <p className="text-soft-plum mt-0.5 line-clamp-2 text-xs">
                            {vessel.shortDescription}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between pt-2">
                          <span className="font-display text-plum text-sm font-bold">
                            {formatKES(vessel.price)}
                          </span>
                          <span
                            className={cn(
                              "font-display inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold",
                              isSelected
                                ? "border-plum bg-bubblegum text-plum"
                                : "border-plum/30 bg-cream text-soft-plum",
                            )}
                          >
                            {isSelected ? (
                              <>
                                <Check className="size-3.5" /> Selected
                              </>
                            ) : (
                              "Select"
                            )}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(2)}>
                    Next: Add Little Extras →
                  </Button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section
                aria-labelledby="gb-step-2"
                className="rounded-feature border-plum shadow-sticker space-y-5 border-2 bg-white p-6"
              >
                <div>
                  <Badge variant="new">Step 2 of 3</Badge>
                  <h2 id="gb-step-2" className="font-display text-plum text-h2 mt-1 font-bold">
                    Tuck In 1 or 2 Little Extras
                  </h2>
                  <p className="text-soft-plum text-small">
                    Choose up to 2 sweet stationery, beauty, or home treats to nestle beside your{" "}
                    {selectedVessel.name}.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {extras.map((extra) => {
                    const isSelected = selectedExtras.some((e) => e.slug === extra.slug);
                    return (
                      <button
                        key={extra.slug}
                        type="button"
                        onClick={() => handleToggleExtra(extra)}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex items-center gap-3.5 rounded-2xl border-2 p-3 text-left transition-all",
                          isSelected
                            ? "border-plum bg-mint/55 shadow-[0_4px_0_#4A3552]"
                            : "border-plum/25 hover:border-plum bg-white",
                        )}
                      >
                        <div className="size-20 shrink-0">
                          <ProductIllustration
                            kind={extra.illustration}
                            backdrop={extra.backdrop}
                            alt={extra.name}
                            className="aspect-square rounded-xl"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-plum truncate text-sm font-bold">
                            {extra.name}
                          </h3>
                          <p className="text-soft-plum line-clamp-2 text-xs">
                            {extra.shortDescription}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-display text-plum text-xs font-bold">
                              +{formatKES(extra.price)}
                            </span>
                            <span className="font-display text-plum text-xs font-bold underline">
                              {isSelected ? "✓ Added" : "+ Add"}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto"
                  >
                    ← Back to Vessel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto"
                  >
                    Next: Wrapping & Note Card →
                  </Button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section
                aria-labelledby="gb-step-3"
                className="rounded-feature border-plum shadow-sticker space-y-5 border-2 bg-white p-6"
              >
                <div>
                  <Badge variant="bestseller">Step 3 of 3</Badge>
                  <h2 id="gb-step-3" className="font-display text-plum text-h2 mt-1 font-bold">
                    Pick Wrapping & Write Your Note Card
                  </h2>
                  <p className="text-soft-plum text-small">
                    Every bundle includes a handwritten-style bow card and a free vinyl sticker
                    sheet!
                  </p>
                </div>

                <div className="space-y-3">
                  {WRAPPING_STYLES.map((wrap) => {
                    const isSelected = wrap.id === selectedWrapId;
                    return (
                      <button
                        key={wrap.id}
                        type="button"
                        onClick={() => setSelectedWrapId(wrap.id)}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex w-full items-center justify-between gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                          isSelected
                            ? "border-plum bg-butter/60 shadow-[0_3px_0_#4A3552]"
                            : "border-plum/25 hover:border-plum bg-white",
                        )}
                      >
                        <div>
                          <p className="font-display text-plum text-sm font-bold">{wrap.name}</p>
                          <p className="text-soft-plum text-xs">{wrap.description}</p>
                        </div>
                        <span className="font-display text-plum shrink-0 text-sm font-bold">
                          +{formatKES(wrap.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <Label htmlFor="gb-recipient">Who is this special gift for? (Optional)</Label>
                    <input
                      id="gb-recipient"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Achieng, My Bestie, Mum"
                      className="border-plum/40 text-plum w-full rounded-2xl border-2 bg-white px-4 py-2.5 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gb-note">Handwritten-Style Card Message</Label>
                    <Textarea
                      id="gb-note"
                      rows={3}
                      value={noteMessage}
                      onChange={(e) => setNoteMessage(e.target.value)}
                      placeholder="Write your sweet message here and we'll print it on our signature bow keepsake card..."
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2.5 pt-2 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto"
                  >
                    ← Back to Extras
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={handleAddBundleToBag}
                    className="w-full sm:w-auto"
                  >
                    <ShoppingBag className="size-5" aria-hidden="true" />
                    <span>Add Bundle to Bag · {formatKES(discountedBundleTotal)}</span>
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Right 5 Columns: Live Bundle Preview Sticker Box */}
          <div className="lg:col-span-5">
            <div className="washi-tape rounded-feature border-plum shadow-sticker-plum-lg sticky top-24 space-y-5 border-2 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-plum flex items-center gap-2 text-lg font-bold">
                  <Gift className="size-5" aria-hidden="true" />
                  <span>Live Gift Box Preview</span>
                </h2>
                <Badge variant="sale">-10% Bundle Off</Badge>
              </div>

              {/* Visual Collage of Selected Items */}
              <div className="border-plum/20 bg-blush/35 grid grid-cols-3 gap-2.5 rounded-2xl border-2 p-3">
                <div className="border-plum rounded-xl border-2 bg-white p-1.5 text-center">
                  <ProductIllustration
                    kind={selectedVessel.illustration}
                    backdrop={selectedVessel.backdrop}
                    alt={selectedVessel.name}
                    className="aspect-square rounded-lg"
                  />
                  <span className="font-display text-plum mt-1 block truncate text-[10px] font-bold">
                    1. {selectedVessel.name}
                  </span>
                </div>

                {[0, 1].map((slotIdx) => {
                  const extraItem = selectedExtras[slotIdx];
                  return extraItem ? (
                    <div
                      key={extraItem.slug}
                      className="border-plum rounded-xl border-2 bg-white p-1.5 text-center"
                    >
                      <ProductIllustration
                        kind={extraItem.illustration}
                        backdrop={extraItem.backdrop}
                        alt={extraItem.name}
                        className="aspect-square rounded-lg"
                      />
                      <span className="font-display text-plum mt-1 block truncate text-[10px] font-bold">
                        +{extraItem.name}
                      </span>
                    </div>
                  ) : (
                    <button
                      key={slotIdx}
                      type="button"
                      onClick={() => setStep(2)}
                      className="border-plum/30 text-soft-plum hover:border-plum flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white/60 p-2 text-center text-xs font-semibold"
                    >
                      <Sparkles className="mb-1 size-4" />
                      <span>+ Extra #{slotIdx + 1}</span>
                    </button>
                  );
                })}
              </div>

              {/* Line Breakdown */}
              <ul className="divide-blush divide-y text-xs font-semibold">
                <li className="flex justify-between py-2">
                  <span className="text-plum">Vessel: {selectedVessel.name}</span>
                  <span className="font-display text-plum font-bold">
                    {formatKES(selectedVessel.price)}
                  </span>
                </li>
                {selectedExtras.map((extra) => (
                  <li key={extra.slug} className="flex justify-between py-2">
                    <span className="text-plum">Extra: {extra.name}</span>
                    <span className="font-display text-plum font-bold">
                      {formatKES(extra.price)}
                    </span>
                  </li>
                ))}
                <li className="flex justify-between py-2">
                  <span className="text-plum">Wrap: {selectedWrap.name}</span>
                  <span className="font-display text-plum font-bold">
                    {formatKES(selectedWrap.price)}
                  </span>
                </li>
              </ul>

              {(recipientName || noteMessage) && (
                <div className="border-plum/25 bg-butter/40 rounded-2xl border p-3 text-xs">
                  <p className="font-display text-plum font-bold">
                    💌 Preview Note Card {recipientName ? `for ${recipientName}` : ""}:
                  </p>
                  <p className="text-plum/90 mt-0.5 italic">
                    &ldquo;{noteMessage || "Sent with big smiles from Whimsy.KE!"}&rdquo;
                  </p>
                </div>
              )}

              <div className="border-blush flex items-center justify-between border-t pt-4">
                <div>
                  <span className="text-soft-plum block text-xs font-bold">
                    Bundle Price (Save {formatKES(rawBundleTotal - discountedBundleTotal)})
                  </span>
                  <HangTagPrice
                    price={discountedBundleTotal}
                    compareAtPrice={rawBundleTotal}
                    size="lg"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleAddBundleToBag}
                className="w-full"
              >
                <Heart className="size-5" aria-hidden="true" />
                <span>Add Whole Bundle to Bag</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
