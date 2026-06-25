import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Globe } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
      <p className="text-gray-400 mb-8">Have questions, suggestions, or concerns? We&apos;d love to hear from you.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input label="Name" name="name" required placeholder="Your name" />
              <Input label="Email" name="email" type="email" required placeholder="your@email.com" />
              <Input label="Subject" name="subject" required placeholder="What's this about?" />
              <Textarea label="Message" name="message" required placeholder="Your message..." />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5 flex items-start gap-4">
              <Mail className="h-5 w-5 text-pink-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-sm text-gray-400">contact@sakuranexus.com</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-start gap-4">
              <MessageSquare className="h-5 w-5 text-pink-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Community Support</h3>
                <p className="text-sm text-gray-400">Join our Discord or forums for community help</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-start gap-4">
              <Globe className="h-5 w-5 text-pink-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white">Press Inquiries</h3>
                <p className="text-sm text-gray-400">press@sakuranexus.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
