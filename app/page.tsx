"use client"

import { useState, useEffect } from "react"
import { Users, Dumbbell, Award, Heart, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"

export default function BootcampHuissen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const scrollToForm = () => {
    document.getElementById("aanmelden")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="relative max-w-[1200px] mx-auto px-6 flex items-center justify-end min-h-[3.25rem] md:min-h-[3.5rem]">
          {/* Logo – gecentreerd in het midden */}
          <a
            href="#"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-bootcamp-huissen-O_ZszHca%20%281%29-mihRgTL1wYWMBSPZ3rAOT4FQnrQmkP.png"
              alt="Bootcamp Huissen"
              className={`h-7 md:h-9 w-auto transition-all duration-300 ${
                headerScrolled ? "" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* CTA Button - Only visible on scroll */}
          <button
            onClick={scrollToForm}
            className={`bg-primary hover:bg-primary/90 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              headerScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            Gratis Proefles
          </button>
        </div>
      </header>

      {/* Hero Section – Club Pellikaan style: split headline + single CTA */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="/videos/deloods-huissen-hero-video.mp4"
              type="video/mp4"
            />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Split headline (single h1, two positioned blocks) */}
        <h1 className="relative z-10 font-display font-bold text-white uppercase tracking-tighter sr-only">
          Word Fit Samen Sterk
        </h1>
        <div
          className={`absolute left-5 sm:left-8 md:left-12 lg:left-16 top-[14%] sm:top-[16%] z-10 transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          aria-hidden
        >
          <span className="font-display font-bold text-white uppercase tracking-tighter block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            Word
          </span>
          <span className="font-display font-bold text-white uppercase tracking-tighter block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            Fit
          </span>
        </div>
        <div
          className={`absolute right-5 sm:right-8 md:right-12 lg:right-16 bottom-8 sm:bottom-10 md:bottom-12 pb-[env(safe-area-inset-bottom)] text-right z-10 transition-all duration-1000 ease-out delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          aria-hidden
        >
          <span className="font-display font-bold text-white uppercase tracking-tighter block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            Samen
          </span>
          <span className="font-display font-bold text-white uppercase tracking-tighter block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            Sterk
          </span>
        </div>

        {/* Primary CTA – bottom-left */}
        <div
          className={`absolute left-5 sm:left-8 md:left-12 lg:left-16 bottom-8 sm:bottom-10 md:bottom-12 pb-[env(safe-area-inset-bottom)] z-10 transition-all duration-1000 ease-out delay-300 ${heroVisible ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={scrollToForm}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 sm:px-10 sm:py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
          >
            Gratis proefles
          </button>
        </div>
      </section>

      {/* Block 2: Feature split – text left, image right (Version A) */}
      <section className="py-20 md:py-28 lg:py-32 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-secondary uppercase tracking-tight">
                MEER DAN ALLEEN SPORTEN
              </h2>
              <div className="space-y-5 text-secondary/90 text-base md:text-lg leading-relaxed">
                <p>
                  Bootcamp Huissen is al 15 jaar een begrip in Huissen.
                  Je traint bij ons niet alleen voor resultaat, maar vooral omdat het gezellig is en je met plezier blijft komen.
                </p>
                <p>
                  Van <strong>BOOTCAMP</strong> tot <strong>CROSSFITNESS</strong>, van <strong>HRX WORKOUTS</strong> tot <strong>PERSONAL TRAINING</strong>:
                  altijd afwisselend, altijd uitdagend, altijd samen.
                </p>
              </div>
              <p className="font-semibold text-secondary pt-2">
                15 jaar in Huissen 🥇 • HRX Workouts 🏋️‍♀️ • Crossfitness • Bootcamp • Personal Training
              </p>
              <div>
                <button
                  onClick={scrollToForm}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                >
                  GRATIS PROEFLES
                </button>
              </div>
            </div>
            {/* Right: image */}
            <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-secondary/10">
              <img
                src="/images/hero-bootcamp.jpg"
                alt="Bootcamp Huissen training"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Options */}
      <section id="trainingen" className="py-24 md:py-32 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight text-center mb-16">
            Onze Trainingen
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TrainingCard
              title="Bootcamp Outside"
              subtitle="Outdoor full body workouts in groepsverband."
              tagline="Kracht. Conditie. Variatie."
              benefits={[
                "Buiten trainen in de frisse lucht",
                "Afwisselende oefeningen",
                "Geschikt voor alle niveaus"
              ]}
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="Workouts Inside"
              subtitle="Small group training in onze loods."
              tagline="Functional fitness met kettlebells en halters."
              benefits={[
                "Maximaal 12 deelnemers per sessie",
                "Professionele apparatuur",
                "Altijd droog trainen"
              ]}
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="Personal Training"
              subtitle="1-op-1 begeleiding."
              tagline="Maximale focus op jouw doelen."
              benefits={[
                "Volledig gepersonaliseerd programma",
                "Flexibele tijden",
                "Sneller resultaat behalen"
              ]}
              onCTAClick={scrollToForm}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary uppercase tracking-tight text-center mb-16">
            Wat Leden Zeggen
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Na jaren van excuses heb ik eindelijk een sportgroep gevonden waar ik me thuis voel. De trainers zijn top en de sfeer is geweldig."
              name="Marieke V."
              role="Lid sinds 2023"
            />
            <TestimonialCard
              quote="Ik dacht dat bootcamp niets voor mij was, maar het tegendeel is bewezen. Fitter dan ooit en een hele leuke groep mensen leren kennen."
              name="Peter K."
              role="Lid sinds 2022"
            />
            <TestimonialCard
              quote="De variatie in trainingen houdt het leuk. Je weet nooit precies wat je te wachten staat, maar het is altijd een goede workout."
              name="Linda B."
              role="Lid sinds 2024"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight text-center mb-16">
            Zo Start Je
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <StepCard
              number="01"
              title="Vraag gratis proefles aan"
              description="Vul het formulier in en we nemen contact met je op."
            />
            <StepCard
              number="02"
              title="Train vrijblijvend mee"
              description="Ervaar zelf de sfeer en energie van onze trainingen."
            />
            <StepCard
              number="03"
              title="Kies wat bij je past"
              description="Bepaal welke trainingsformule het beste bij jou past."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary uppercase tracking-tight text-center mb-16">
            Tarieven
          </h2>
          
          <div className="space-y-4 mb-8">
            <PricingRow label="1x per week" price="€41,95" period="/maand" />
            <PricingRow label="2x per week" price="€52,95" period="/maand" />
            <PricingRow label="Onbeperkt" price="€63,95" period="/maand" featured />
          </div>
          
          <p className="text-center text-muted-foreground mb-10">
            Eerste proefles is altijd gratis.
          </p>
          
          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Gratis Proefles Aanvragen
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Form */}
      <section id="aanmelden" className="py-24 md:py-32 bg-secondary">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight text-center mb-4">
            Klaar Om Te Starten?
          </h2>
          <p className="text-white/80 text-center mb-12">
            Vraag je gratis proefles aan en ontdek waarom Bootcamp Huissen anders is.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 border border-white/20 p-8 text-center">
              <h3 className="font-display text-2xl text-white uppercase mb-4">Bedankt!</h3>
              <p className="text-white/80">
                We nemen zo snel mogelijk contact met je op om je proefles in te plannen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Naam"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mailadres"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <select
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-secondary">Interesse in...</option>
                  <option value="bootcamp" className="bg-secondary">Bootcamp Outside</option>
                  <option value="workouts" className="bg-secondary">Workouts Inside</option>
                  <option value="personal" className="bg-secondary">Personal Training</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
              >
                {isSubmitting ? "Verzenden..." : "Plan Mijn Gratis Proefles"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider mb-2">
                Bootcamp Huissen
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Huissen
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@bootcamphuissen.nl
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  06-12345678
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Bootcamp Huissen. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 text-primary mb-6">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-secondary uppercase tracking-wide mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function TrainingCard({ 
  title, 
  subtitle, 
  tagline, 
  benefits, 
  onCTAClick 
}: { 
  title: string
  subtitle: string
  tagline: string
  benefits: string[]
  onCTAClick: () => void
}) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 flex flex-col h-full">
      <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className="text-white/80 mb-1">{subtitle}</p>
      <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-6">{tagline}</p>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3 text-white/70">
            <span className="text-primary mt-1">—</span>
            {benefit}
          </li>
        ))}
      </ul>
      
      <button
        onClick={onCTAClick}
        className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
      >
        Gratis Proefles
      </button>
    </div>
  )
}

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="border border-border p-8">
      <blockquote className="text-foreground leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <p className="font-semibold text-secondary">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <span className="font-display text-6xl font-bold text-primary">{number}</span>
      <h3 className="font-display text-xl font-semibold text-white uppercase tracking-wide mt-4 mb-3">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function PricingRow({ label, price, period, featured = false }: { label: string; price: string; period: string; featured?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-6 border ${featured ? 'border-primary bg-primary/5' : 'border-border'}`}>
      <span className={`font-semibold ${featured ? 'text-primary' : 'text-secondary'}`}>{label}</span>
      <div className="text-right">
        <span className="font-display text-2xl font-bold text-secondary">{price}</span>
        <span className="text-muted-foreground text-sm">{period}</span>
      </div>
    </div>
  )
}
