"use client";

import React, { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Coffee, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// EmailJS configuration (replace with your actual values)
const EMAILJS_SERVICE_ID = "service_eibq4qb";
const EMAILJS_TEMPLATE_ID = "template_0t0pj4v";
const EMAILJS_PUBLIC_KEY = "jFpB1m3tkne8zl-FD";

// Framer motion animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loading) return;
      setLoading(true);

      const form = e.currentTarget;
      const formData = new FormData(form);

      // Match EmailJS template variable names exactly
      const data = {
        from_name: formData.get("name")?.toString().trim(),
        reply_to: formData.get("email")?.toString().trim(),
        subject: formData.get("subject")?.toString().trim(),
        message: formData.get("message")?.toString().trim(),
      };

      // Basic field validation
      if (!data.from_name || !data.reply_to || !data.subject || !data.message) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          data,
          EMAILJS_PUBLIC_KEY
        );

        toast.success("Message sent successfully!");
        form.reset();
      } catch (error: any) {
        toast.error(error?.text || "Sending failed. Please try again.");
        console.error("EmailJS error:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  return (
    <section id="contact" className="scroll-mt-16 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="mx-auto max-w-5xl"
      >
        <div className="md:flex md:flex-row-reverse md:items-center md:gap-12">
          {/* Left Side - SVG Image */}
          <div className="hidden md:flex w-full max-w-sm items-center justify-center">
            <img
              src="/donate2.svg"
              alt="Coffee Chat"
              className="h-full w-auto max-w-full object-contain"
            />
          </div>

          {/* Right Side - Form */}
          <Card className="flex-1 md:w-2/3 p-6 sm:p-8 shadow-md bg-background/60 flex flex-col">
            <div className="flex flex-col items-center mb-6">
              <Coffee className="h-10 w-10 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight mt-2">
                Chai with me?
              </h2>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                "Brewing ideas and connections—one Chai at a time." ☕✨
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex flex-col h-full"
              ref={formRef}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    required
                    className="bg-background/60"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-background/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  name="subject"
                  id="subject"
                  placeholder="Project Inquiry"
                  required
                  className="bg-background/60"
                />
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  name="message"
                  id="message"
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-[150px] bg-background/60"
                />
              </div>
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
