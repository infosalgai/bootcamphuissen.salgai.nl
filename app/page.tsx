"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Dumbbell, Award, Heart, Mail, Phone, MapPin, Instagram, Facebook, Menu, X } from "lucide-react"

export default function BootcampHuissen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
    comment: "",
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const heroElement = heroRef.current
    if (!heroElement) return

    const observer = new IntersectionObserver(([entry]) => {
      // Zodra de hero volledig uit beeld is (niet meer intersecting), header wit maken
      setHeaderScrolled(!entry.isIntersecting)
    }, {
      threshold: 0,
    })

    observer.observe(heroElement)

    return () => {
      if (heroElement) observer.unobserve(heroElement)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const toggleInterest = (value: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(value)
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((v) => v !== value)
          : [...prev.interests, value]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) {
      return
    }
    setIsSubmitting(true)

    try {
      const webhookUrl = "https://advertiger.app.n8n.cloud/webhook-test/af09756c-3d0d-41c4-82de-76d9cc9a7952"

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interests: formData.interests,
          comment: formData.comment,
          consent: formData.consent,
          source: "bootcamphuissen.nl",
          page: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Fout bij versturen naar webhook", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById("aanmelden")?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <main className="min-h-screen">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          headerScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div
          className={`grid max-w-[1200px] mx-auto px-6 min-h-[3.25rem] md:min-h-[3.5rem] ${
            headerScrolled ? "grid-cols-[auto_1fr_auto]" : "grid-cols-[auto_1fr]"
          } md:grid-cols-[auto_1fr_auto]`}
        >
          {/* Hamburger – wit icoon (invert wanneer header transparant) */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className={`p-2 -ml-2 transition-colors ${
                headerScrolled ? "text-secondary hover:text-primary" : "text-white hover:text-white/80"
              }`}
              aria-label="Menu openen"
            >
              <Menu className="w-7 h-7 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Logo – gecentreerd op mobiel bij transparante header, naar links zodra CTA zichtbaar wordt */}
          <div
            className={`flex items-center ${
              headerScrolled ? "justify-start" : "justify-center"
            }`}
          >
            <a
              href="#"
              className="flex items-center"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-bootcamp-huissen-O_ZszHca%20%281%29-mihRgTL1wYWMBSPZ3rAOT4FQnrQmkP.png"
                alt="Bootcamp Huissen"
                className={`h-7 md:h-9 w-auto transition-all duration-300 ${
                  headerScrolled ? "" : "brightness-0 invert"
                }`}
              />
            </a>
          </div>

          {/* CTA Button – verschijnt op mobiel zodra header wit wordt, altijd zichtbaar op desktop */}
          <div
            className={`items-stretch justify-end ${
              headerScrolled ? "flex" : "hidden"
            } md:flex`}
          >
            <button
              onClick={scrollToForm}
              className={`rounded-[5px] bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 px-6 flex items-center h-full min-h-[3.25rem] md:min-h-[3.5rem] ${
                headerScrolled
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              Gratis Proefles
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger menu overlay – wit */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col min-h-full pt-24 pb-12 px-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-secondary hover:text-primary transition-colors"
            aria-label="Menu sluiten"
          >
            <X className="w-8 h-8" />
          </button>
          <nav className="flex flex-col gap-2" aria-label="Hoofdnavigatie">
            <a
              href="#over-ons"
              onClick={(e) => { e.preventDefault(); scrollToSection("over-ons") }}
              className="font-sans text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary transition-colors"
            >
              Over ons
            </a>
            <a
              href="#trainingen"
              onClick={(e) => { e.preventDefault(); scrollToSection("trainingen") }}
              className="font-sans text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary transition-colors"
            >
              Onze trainingen
            </a>
            <a
              href="#tarieven"
              onClick={(e) => { e.preventDefault(); scrollToSection("tarieven") }}
              className="font-sans text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary transition-colors"
            >
              Tarieven
            </a>
            <a
              href="#zo-start-je"
              onClick={(e) => { e.preventDefault(); scrollToSection("zo-start-je") }}
              className="font-sans text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary transition-colors"
            >
              Zo start je
            </a>
            <a
              href="#aanmelden"
              onClick={(e) => { e.preventDefault(); scrollToForm() }}
              className="font-sans text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary/90 transition-colors mt-2"
            >
              Gratis proefles aanvragen
            </a>
          </nav>
        </div>
      </div>

      {/* Hero Section – Club Pellikaan style: split headline + single CTA */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Split headline (single h1, two positioned blocks) */}
        <h1 className="relative z-10 font-sans font-semibold text-white tracking-tight uppercase sr-only">
          WORD FIT SAMEN STERK
        </h1>
        <div
          className={`absolute left-5 sm:left-8 md:left-12 lg:left-16 top-[20%] sm:top-[18%] md:top-[16%] z-10 transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          aria-hidden
        >
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            WORD
          </span>
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            FIT
          </span>
        </div>
        <div
          className={`absolute right-5 sm:right-8 md:right-12 lg:right-16 bottom-24 sm:bottom-20 md:bottom-12 pb-[env(safe-area-inset-bottom)] text-right z-10 transition-all duration-1000 ease-out delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          aria-hidden
        >
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            SAMEN
          </span>
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            STERK
          </span>
        </div>

        {/* Primary CTA – bottom-left */}
        <div
          className={`absolute left-5 sm:left-8 md:left-12 lg:left-16 bottom-8 sm:bottom-10 md:bottom-12 pb-[env(safe-area-inset-bottom)] z-10 transition-all duration-1000 ease-out delay-300 ${heroVisible ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={scrollToForm}
            className="rounded-[5px] bg-primary hover:bg-primary/90 text-white px-8 py-4 sm:px-10 sm:py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
          >
            Gratis proefles
          </button>
        </div>
      </section>

      {/* Block 2: Feature split – text left, image right (Version A) */}
      <section id="over-ons" className="py-20 md:py-28 lg:py-32 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase">
                Een plek waar je erbij hoort
              </h2>
              <div className="space-y-5 text-secondary/90 text-base md:text-lg leading-relaxed">
                <p>
                  Of je nu net begint of al jaren sport: bij Bootcamp Huissen ben je welkom. We trainen samen, lachen samen en helpen elkaar vooruit.
                </p>
                <p>
                  Geen hiërarchie, geen oordeel. Gewoon een fijne groep mensen die fit wil worden en elkaar een duwtje in de rug geeft. Jij past erbij.
                </p>
              </div>
              <p className="font-semibold text-secondary pt-2">
                Al 15 jaar de plek in Huissen waar nieuwe gezichten meteen meedoen.
              </p>
              <div>
                <button
                  onClick={scrollToForm}
                  className="rounded-[5px] bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-bold tracking-widest transition-all duration-300"
                >
                  Gratis proefles
                </button>
              </div>
            </div>
            {/* Right: video */}
            <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-secondary/10">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="/videos/Bootcamp Huissen X @upwarddames2 🏑De dames van Upward 2 hadden een duwtje in de rug nodig richt.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Training Options */}
      <section id="trainingen" className="py-24 md:py-32 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-4">
            Onze Trainingen
          </h2>
          <p className="text-secondary/80 text-center max-w-2xl mx-auto mb-14 text-base md:text-lg">
            Kies de vorm die bij jou past. Elke training is in kleine groepen, met aandacht voor techniek en
            persoonlijke begeleiding.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <TrainingCard
              title="Bootcamp Outside"
              subtitle="Outdoor full body workouts in groepsverband."
              tagline="Kracht. Conditie. Variatie."
              benefits={["Buiten", "Alle niveaus", "Frisse lucht"]}
              imageSrc="https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=800"
              imageAlt="Groep die buiten samen sport tijdens een bootcamptraining"
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="Workouts Inside"
              subtitle="Small group training in onze loods."
              tagline="Functional fitness met kettlebells en halters."
              benefits={["Max 12 deelnemers", "Droog trainen", "Kettlebells"]}
              imageSrc="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
              imageAlt="Binnen training met kettlebells in een loods"
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="Personal Training"
              subtitle="1-op-1 begeleiding."
              tagline="Maximale focus op jouw doelen."
              benefits={["1-op-1", "Op maat", "Flexibel"]}
              imageSrc="https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=800"
              imageAlt="Trainer die één-op-één een sporter begeleidt"
              onCTAClick={scrollToForm}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-16">
            Wat Leden Écht Zeggen
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Ik kwam binnen met nul conditie en best wat spanning. Na een paar weken kende ik ieders naam en voelde ik me geen seconde meer 'de nieuwe'. De trainers zien echt wat jij nodig hebt."
              name="Marieke (32) uit Huissen"
              role="Traint 2x per week · Bootcamp Outside"
            />
            <TestimonialCard
              quote="Ik dacht altijd dat bootcamp alleen voor super fitte mensen was. Nu sta ik zelf drie keer per week in de loods en mis ik het als ik een keer niet kan. De groep sleept je erdoorheen."
              name="Peter (45) uit Arnhem"
              role="Komt 3x per week · Workouts Inside"
            />
            <TestimonialCard
              quote="Door de persoonlijke aandacht durfde ik eindelijk weer te beginnen na een blessure. We bouwen rustig op, maar ik merk elke maand verschil. Het voelt meer als samen trainen dan als 'sportschool'."
              name="Linda (38) uit Huissen"
              role="Combinatie van Bootcamp Outside & Personal Training"
            />
          </div>
        </div>
      </section>

      {/* Block 4: Waarom je hier lid wilt worden */}
      <section id="zo-start-je" className="py-24 md:py-32 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-6">
            Waarom Jij Hier Wilt Trainen
          </h2>
          <p className="text-secondary/80 text-center max-w-2xl mx-auto mb-14 text-base md:text-lg">
            Je wilt je weer fit voelen, meer energie hebben en je hoofd leegmaken. Bij Bootcamp Huissen doe je dat
            in een groep waar je gezien wordt, op jouw niveau traint en iedere week een stapje vooruit gaat.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <BenefitCard
              icon={<Users className="w-12 h-12" />}
              title="Je doet het nooit alleen"
              description="Geen sportschool waar je anoniem rondloopt, maar een vaste groep en trainers die je bij naam kennen en je motiveren als je het even zwaar hebt."
            />
            <BenefitCard
              icon={<Heart className="w-12 h-12" />}
              title="Geschikt voor elk niveau"
              description="Je hoeft niet fit te zijn om te starten. We laten je op jouw niveau instappen en passen oefeningen aan zodat jij veilig en met een goed gevoel mee kunt doen."
            />
            <BenefitCard
              icon={<Dumbbell className="w-12 h-12" />}
              title="Merkbaar meer energie"
              description="Kracht, conditie en een leeg hoofd in één training. Binnen een paar weken voel je je sterker, slaap je beter en heb je meer energie in je dagelijkse leven."
            />
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={scrollToForm}
              className="rounded-[5px] bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Ja, ik wil dit proberen
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarieven" className="py-24 md:py-32 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-4">
            Tarieven
          </h2>
          <p className="text-center text-secondary/80 text-base md:text-lg mb-12">
            Geen inschrijfgeld, geen verborgen kosten. Kies wat bij je past — je eerste proefles is gratis en zonder verplichting.
          </p>
          
          <div className="space-y-4 mb-8">
            <PricingRow
              label="1x per week"
              price="€41,95"
              period="/maand"
              description="Eén vaste training per week: volle aandacht van de groep en trainers. Ideaal om rustig op te bouwen of als je weinig tijd hebt."
            />
            <PricingRow
              label="2x per week"
              price="€52,95"
              period="/maand"
              description="De keuze van de meeste leden. Twee vaste momenten per week voor zichtbaar resultaat — sneller sterker en fitter."
              badge="Meest gekozen"
            />
            <PricingRow
              label="Onbeperkt"
              price="€63,95"
              period="/maand"
              description="Train zo vaak als je wilt: Bootcamp Outside én Workouts Inside. Maximale flexibiliteit en de laagste prijs per training."
              featured
              badge="Beste waarde"
            />
          </div>
          
          <p className="text-center text-muted-foreground mb-10">
            Eerste proefles altijd gratis · Geen verplichtingen
          </p>
          
          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="rounded-[5px] bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Gratis Proefles Aanvragen
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Form */}
      <section id="aanmelden" className="py-24 md:py-32 bg-[#f5f0eb]">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-4">
            Klaar Om Te Starten?
          </h2>
          <p className="text-secondary/80 text-center mb-12">
            Vraag je gratis proefles aan en ontdek waarom Bootcamp Huissen anders is.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white border border-border p-8 text-center">
              <h3 className="font-sans text-2xl font-semibold text-secondary tracking-tight uppercase mb-4">Bedankt!</h3>
              <p className="text-muted-foreground">
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
                  className="w-full bg-white border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mailadres"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefoonnummer"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-secondary/80">
                  Waar heb je interesse in? <span className="text-muted-foreground">(optioneel)</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {[
                    { label: "De Loods (binnen)", value: "de_loods_binnen" },
                    { label: "Bootcamp (buiten)", value: "bootcamp_buiten" },
                    { label: "Personal training", value: "personal_training" },
                    { label: "Vrij trainen", value: "vrij_trainen" },
                  ].map((option) => {
                    const isActive = formData.interests.includes(option.value)
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleInterest(option.value)}
                        className={`rounded-[5px] px-3 py-2 text-xs sm:text-sm font-medium border transition-colors ${
                          isActive
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-foreground border-border hover:border-primary/60"
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm text-secondary/80">
                  Opmerking <span className="text-muted-foreground">(optioneel)</span>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    className="mt-2 w-full bg-white border border-border text-foreground placeholder:text-muted-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-y"
                    placeholder="Bijvoorbeeld: welke dag/tijd past vaak goed, of heb je blessures waar we rekening mee moeten houden?"
                  />
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  className="mt-1 h-4 w-4 border-border text-primary focus:ring-primary"
                />
                <label htmlFor="contact-consent" className="text-sm text-secondary/80">
                  Ik geef toestemming om contact met mij op te nemen over mijn aanvraag.
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[5px] w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
              >
                {isSubmitting ? "Verzenden..." : "Verzenden"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-sans text-xl font-semibold text-secondary tracking-tight uppercase mb-2">
                Bootcamp Huissen
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-4 text-secondary/70 text-sm">
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
              <div className="mt-4 text-secondary/70 text-xs md:text-sm space-y-1">
                <p>KvK nr: 74103393</p>
                <p>Btw nr: NL108879136B01</p>
                <p>
                  <a
                    href="/privacybeleid"
                    className="underline underline-offset-2 hover:text-primary transition-colors"
                  >
                    Privacybeleid
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/groups/bootcamphuissen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-primary transition-colors"
                aria-label="Facebook groep Bootcamp Huissen"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/bootcamphuissen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-primary transition-colors"
                aria-label="Instagram Bootcamp Huissen"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@marwanvh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary/70 hover:text-primary transition-colors"
                aria-label="TikTok Bootcamp Huissen"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Bootcamp Huissen. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16 3v3.25c0 1.51 1.23 2.75 2.75 2.75H20v2.5a5.75 5.75 0 0 1-3.54-1.17V16A5 5 0 1 1 11 11h2.5a2.5 2.5 0 1 0 0 4.9V3h2.5Z"
      />
    </svg>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 text-primary mb-6">
        {icon}
      </div>
      <h3 className="font-sans text-xl font-semibold text-secondary tracking-tight uppercase mb-3">
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
  imageSrc,
  imageAlt,
  onCTAClick 
}: { 
  title: string
  subtitle: string
  tagline: string
  benefits: string[]
  imageSrc: string
  imageAlt: string
  onCTAClick: () => void
}) {
  return (
    <article className="bg-white border border-border rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
<h3 className="font-sans text-2xl font-semibold text-secondary tracking-tight uppercase mb-1">
        {title}
        </h3>
        <p className="text-muted-foreground mb-1">{subtitle}</p>
        <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-5">
          {tagline}
        </p>

        <ul className="list-disc list-inside text-foreground/80 text-sm mb-6 flex-grow space-y-1.5">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        <button
          onClick={onCTAClick}
          className="rounded-[5px] w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        >
          Gratis Proefles
        </button>
      </div>
    </article>
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
      <span className="font-sans text-6xl font-semibold text-primary tracking-tight">{number}</span>
      <h3 className="font-sans text-xl font-semibold text-secondary tracking-tight uppercase mt-4 mb-3">
        {title}
      </h3>
      <p className="text-secondary/80 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function PricingRow({
  label,
  price,
  period,
  description,
  badge,
  featured = false
}: {
  label: string
  price: string
  period: string
  description?: string
  badge?: string
  featured?: boolean
}) {
  return (
    <div className={`p-6 border ${featured ? "border-primary bg-primary/5" : "border-border"}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-semibold ${featured ? "text-primary" : "text-secondary"}`}>{label}</span>
            {badge && (
              <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <span className="font-sans text-2xl font-bold text-secondary tracking-tight">{price}</span>
          <span className="text-muted-foreground text-sm">{period}</span>
        </div>
      </div>
    </div>
  )
}
