"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/formatters";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z
    .string()
    .refine(
      (v) => isValidKenyanPhone(v),
      "Please enter a valid Kenyan phone number (e.g. 0712 345 678).",
    ),
  email: z.email("Please enter a valid email address."),
  topic: z.string().min(1, "Please pick a topic."),
  message: z.string().min(10, "Please share a few more details (at least 10 characters)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactView() {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      topic: "Order or Delivery Question",
      message: "",
    },
  });

  async function onSubmit(_values: ContactFormValues) {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    toast.success("Asante! We've received your message and will reply shortly 💕");
  }

  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Say Hujambo! 💌</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">
            Contact Our Nairobi Studio
          </h1>
          <p className="text-soft-plum text-body mt-1 max-w-xl">
            Have a question about custom gift wrapping, bulk corporate gifting, or an existing
            order? We&apos;re always happy to help.
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-(--spacing-container) px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Cards */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-card border-plum shadow-sticker space-y-4 border-2 bg-white p-6">
              <h2 className="font-display text-plum text-h3 font-bold">Direct Channels</h2>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3">
                  <Phone className="text-plum size-5 shrink-0" />
                  <span>
                    <strong className="text-plum block">WhatsApp & Call</strong>
                    {siteConfig.contact.phoneDisplay}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="text-plum size-5 shrink-0" />
                  <span>
                    <strong className="text-plum block">Email</strong>
                    {siteConfig.contact.email}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="text-plum mt-0.5 size-5 shrink-0" />
                  <span>
                    <strong className="text-plum block">Pickup Studio</strong>
                    {siteConfig.contact.pickupAddress}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="text-plum size-5 shrink-0" />
                  <span>
                    <strong className="text-plum block">Studio Hours</strong>
                    {siteConfig.contact.hours}
                  </span>
                </p>
              </div>

              <Button asChild variant="mint" size="md" className="w-full">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  <span>Chat Instantly on WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-feature border-plum shadow-sticker-plum border-2 bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <BowMascot mood="happy" size="lg" />
                  <h2 className="font-display text-plum text-h2 mt-4 font-bold">
                    Asante sana! Your note is in our inbox 🎀
                  </h2>
                  <p className="text-soft-plum text-body mt-1 max-w-md">
                    Our Kilimani team typically replies within 1 business hour on WhatsApp and
                    email.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    className="mt-6"
                    onClick={() => {
                      reset();
                      setSubmitted(false);
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <h2 className="font-display text-plum text-h3 font-bold">Send Us a Sweet Note</h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="contact-name">Your Name</Label>
                      <Input
                        id="contact-name"
                        autoComplete="name"
                        placeholder="e.g. Amani Mwangi"
                        hasError={Boolean(errors.name)}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-error mt-1 text-xs font-semibold">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contact-phone">Kenyan Phone Number</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0712 345 678"
                        hasError={Boolean(errors.phone)}
                        {...register("phone", {
                          onBlur: (e) => setValue("phone", normalizeKenyanPhone(e.target.value)),
                        })}
                      />
                      {errors.phone && (
                        <p className="text-error mt-1 text-xs font-semibold">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="amani@example.com"
                        hasError={Boolean(errors.email)}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-error mt-1 text-xs font-semibold">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contact-topic">How Can We Help?</Label>
                      <select
                        id="contact-topic"
                        className="border-plum/40 text-plum font-display flex min-h-12 w-full rounded-2xl border-2 bg-white px-4 py-2.5 text-sm font-semibold shadow-[0_3px_0_#FFD9E8]"
                        {...register("topic")}
                      >
                        <option value="Order or Delivery Question">
                          Order or Delivery Question
                        </option>
                        <option value="Custom Gift Box / Corporate Gifting">
                          Custom Gift Box / Corporate Gifting
                        </option>
                        <option value="Return or Exchange">Return or Exchange</option>
                        <option value="Say Karibu!">Just Saying Karibu!</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contact-message">Your Message</Label>
                    <Textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell us what you're looking for or share your order number..."
                      hasError={Boolean(errors.message)}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-error mt-1 text-xs font-semibold">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                    <Send className="size-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
