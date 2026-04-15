import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { toast } from "@/hooks/use-toast";

const QuoteRequest: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product_interest: "",
    print_type: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Placeholder: In production, this would send to an edge function
    setTimeout(() => {
      toast({
        title: t("Kiitos yhteydenotostasi!", "Thank you for your inquiry!"),
        description: t(
          "Palaamme asiaan 24–48 tunnin kuluessa.",
          "We will get back to you within 24–48 hours."
        ),
      });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        product_interest: "",
        print_type: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Pyydä tarjous", "Request a Quote")}
          </h1>
          <p className="text-muted-foreground mb-12">
            {t(
              "Täytä alla oleva lomake ja palaamme asiaan mahdollisimman pian.",
              "Fill out the form below and we'll get back to you as soon as possible."
            )}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">{t("Nimi", "Full Name")} *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="company">{t("Yritys", "Company")} *</Label>
              <Input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">{t("Sähköposti", "Email")} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">{t("Puhelin", "Phone")}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="product_interest">{t("Tuote / kiinnostus", "Product interest")}</Label>
              <Input
                id="product_interest"
                name="product_interest"
                value={form.product_interest}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="print_type">{t("Painatustapa", "Print Type")}</Label>
              <select
                id="print_type"
                name="print_type"
                value={form.print_type}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">{t("Valitse...", "Select...")}</option>
                <option value="painatus">{t("Painatus", "Printing")}</option>
                <option value="brodeeraus">{t("Brodeeraus", "Embroidery")}</option>
                <option value="en_ole_varma">{t("En ole varma", "Not sure")}</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">{t("Viesti", "Message")}</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="mt-2"
              />
            </div>

            <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading}>
              {loading
                ? t("Lähetetään...", "Sending...")
                : t("Lähetä tarjouspyyntö", "Send Quote Request")}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default QuoteRequest;
