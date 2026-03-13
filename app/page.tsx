"use client"

import React, { useState, useEffect, useRef } from "react"
import { Users, Dumbbell, Heart, Mail, Phone, MapPin, Instagram, Facebook, Menu, X } from "lucide-react"

const splitWords = (text: string): [string, string] => {
  const firstSpace = text.indexOf(" ")
  if (firstSpace === -1) return [text, ""]
  return [text.slice(0, firstSpace), text.slice(firstSpace + 1)]
}

export default function BootcampHuissen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [leftHeroText, setLeftHeroText] = useState("")
  const [rightHeroText, setRightHeroText] = useState("")
  const heroRef = useRef<HTMLElement | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const aboutVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!heroVisible) {
      setLeftHeroText("")
      setRightHeroText("")
      return
    }

    const leftFull = "Samen fitter"
    const rightFull = "Samen sterker"
    const timeouts: number[] = []

    const typePhrase = (
      full: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      startDelay: number
    ) => {
      for (let i = 0; i <= full.length; i++) {
        const timeoutId = window.setTimeout(() => {
          setter(full.slice(0, i))
        }, startDelay + i * 80)
        timeouts.push(timeoutId)
      }
    }

    typePhrase(leftFull, setLeftHeroText, 0)
    typePhrase(rightFull, setRightHeroText, 600)

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [heroVisible])

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
    const autoplayVideo = (video: HTMLVideoElement | null) => {
      if (!video) return
      const playPromise = video.play()
      if (playPromise && typeof (playPromise as Promise<void>).catch === "function") {
        ;(playPromise as Promise<void>).catch(() => {
          // Sommige mobiele browsers blokkeren autoplay alsnog; in dat geval doen we niets.
        })
      }
    }

    autoplayVideo(heroVideoRef.current)
    autoplayVideo(aboutVideoRef.current)
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

  const [leftFirstWord, leftSecondWord] = splitWords(leftHeroText)
  const [rightFirstWord, rightSecondWord] = splitWords(rightHeroText)

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const faqItems = [
    {
      question: "Wat is een gratis proefles?",
      answer:
        "Je schrijft je in voor één training naar keuze om Bootcamp Huissen te ervaren. De les is geheel vrijblijvend: na afloop beslis je zelf of je vaker wilt komen.",
    },
    {
      question: "Voor wie is dit geschikt?",
      answer:
        "Onze trainingen zijn voor mannen en vrouwen van verschillende leeftijden die fitter en sterker willen worden. Je traint altijd op je eigen niveau, met aanpassingen waar nodig.",
    },
    {
      question: "Moet ik al fit zijn om te beginnen?",
      answer:
        "Nee, absoluut niet. Juist als je al een tijd niet gesport hebt ben je welkom. We bouwen rustig op en houden rekening met jouw startniveau.",
    },
    {
      question: "Sporten jullie alleen buiten?",
      answer:
        "Nee. We geven zowel buitenlessen (Bootcamp) als trainingen in onze eigen loods. Afhankelijk van je abonnement kun je één of beide vormen combineren.",
    },
    {
      question: "Wat als ik een blessure of klacht heb?",
      answer:
        "Geef dit altijd even aan bij de trainer voor de les. We denken met je mee en passen oefeningen aan, zodat je veilig kunt meedoen of rustig kunt opbouwen.",
    },
    {
      question: "Wat neem ik mee naar mijn eerste training?",
      answer:
        "Draag sportkleding waarin je vrij kunt bewegen, sportschoenen en neem een flesje water mee. Bij buitentrainingen is het fijn als je je kleding afstemt op het weer.",
    },
  ]

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
          {/* Hamburger – links tegen viewport aan */}
          <div className="flex items-center xl:ml-[calc(-50vw+576px)]">
            <button
              onClick={() => setMenuOpen(true)}
              className={`p-2 -ml-6 transition-colors ${
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
                className={`rounded-[5px] bg-primary hover:bg-primary/90 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 px-6 flex items-center h-full min-h-[3.25rem] md:min-h-[3.5rem] ${
                  headerScrolled
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                Gratis proefles
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
              href="#waarom-hier-trainen"
              onClick={(e) => { e.preventDefault(); scrollToSection("waarom-hier-trainen") }}
              className="font-sans text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tight py-3 border-b border-border/50 hover:text-primary transition-colors"
            >
              Waarom hier trainen
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
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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
          WORD FITTER SAMEN STERKER
        </h1>
        <div
          className={`absolute left-5 sm:left-8 md:left-12 lg:left-16 top-[20%] sm:top-[18%] md:top-[16%] z-10 transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          aria-hidden
        >
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            {leftFirstWord}
          </span>
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            {leftSecondWord}
          </span>
        </div>
        <div
          className={`absolute right-5 sm:right-8 md:right-12 lg:right-16 bottom-24 sm:bottom-20 md:bottom-12 pb-[env(safe-area-inset-bottom)] text-right z-10 transition-all duration-1000 ease-out delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          aria-hidden
        >
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            {rightFirstWord}
          </span>
          <span className="font-sans font-semibold text-white tracking-tight uppercase block text-[clamp(2rem,5vw+1.5rem,4.5rem)] md:text-[clamp(2.5rem,6vw+1rem,5.5rem)] leading-[1.05]">
            {rightSecondWord}
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
                Join dé sportcommunity van Huissen
              </h2>
              <div className="space-y-5 text-secondary/90 text-base md:text-lg leading-relaxed">
                <p>
                  Al 15 jaar is Bootcamp Huissen de plek waar mensen uit Huissen en omgeving samen sporten in het hart van de stad.
                </p>
                <p>
                  Je traint in kleine groepen, met persoonlijke aandacht, vaste gezichten en een open sfeer waarin nieuwe leden zich snel thuis voelen.
                </p>
              </div>
              <p className="font-semibold text-secondary pt-2">
                Samen fitter worden, midden in het centrum van Huissen.
              </p>
              <div>
              <button
                onClick={scrollToForm}
                className="rounded-[5px] bg-primary hover:bg-primary/90 text-white px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300"
              >
                Gratis proefles
              </button>
              </div>
            </div>
            {/* Right: video */}
            <div className="relative aspect-[4/3] md:aspect-square rounded-lg overflow-hidden bg-secondary/10">
              <video
                ref={aboutVideoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
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
              title="Bootcamp"
              subtitle="Outdoor full body workouts in groepsverband."
              benefits={[
                "Full body buitenworkout",
                "Met uitdagende objecten",
                "Professionele begeleiding"
              ]}
              imageSrc="/bootcamp-outside.webp"
              imageAlt="Deelnemers aan Bootcamp Outside die samen met zandzakken trainen in de buitenlucht"
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="De Loods"
              subtitle="Small group training in onze loods."
              benefits={[
                "Full body in kleine groep",
                "Kettlebells, halters en meer",
                "Voor elk niveau"
              ]}
              imageSrc="/deloods.webp"
              imageAlt="Deelnemers die in De Loods samen krachttraining doen met halters en materiaal"
              onCTAClick={scrollToForm}
            />
            <TrainingCard
              title="Personal Training"
              subtitle="1-op-1 begeleiding."
              benefits={[
                "1-op-1 op jouw niveau",
                "Samen naar jouw doelen",
                "Extra duwtje in de rug"
              ]}
              imageSrc="/pt-deloods.webp"
              imageAlt="Persoonlijke training met halter in De Loods"
              onCTAClick={scrollToForm}
            />
          </div>
        </div>
      </section>

      {/* Block 4: Waarom jij hier wilt trainen */}
      <section id="waarom-hier-trainen" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-secondary/70 uppercase text-center mb-12">
            Waarom jij hier wilt trainen
          </p>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <BenefitCard
              icon={<Users className="w-12 h-12" />}
              title="Altijd samen, nooit alleen"
              description="Je sport in een hechte groep met vaste trainers die je bij naam kennen en je elke training vooruit duwen."
            />
            <BenefitCard
              icon={<Heart className="w-12 h-12" />}
              title="Instappen op jouw niveau"
              description="Of je net begint of al een tijd traint: we schalen elke oefening, zodat jij veilig en met vertrouwen mee kunt doen."
            />
            <BenefitCard
              icon={<Dumbbell className="w-12 h-12" />}
              title="Snel resultaat dat je voelt"
              description="In één training werk je aan kracht, conditie en een leeg hoofd. Na een paar weken merk je meer energie, betere slaap en meer zelfvertrouwen."
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

      {/* Final CTA / Contact Form */}
      <section id="aanmelden" className="py-24 md:py-32 bg-[#f5f0eb]">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary tracking-tight uppercase text-center mb-4">
            Klaar om te starten?
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

      <section className="bg-[#f5f0eb] pb-24 md:pb-32">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white border border-border p-6 sm:p-8 shadow-sm">
            <h3 className="font-sans text-xl sm:text-2xl font-semibold text-secondary tracking-tight uppercase text-center mb-6">
              Veelgestelde vragen
            </h3>
            <div className="space-y-3 text-sm text-secondary/80">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <div
                    key={item.question}
                    className="border border-border/60"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex((prev) => (prev === index ? null : index))
                      }
                      className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-3 sm:py-4 text-left"
                    >
                      <span className="font-semibold text-secondary">
                        {item.question}
                      </span>
                      <span className="text-primary text-xl leading-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                        <p className="text-muted-foreground">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing – nu onderaan de pagina */}
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
              Gratis proefles aanvragen
            </button>
          </div>
        </div>
      </section>

      {/* Extra CTA onder tarieven */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase mb-4">
            Nog twijfel? Plan je gratis proefles
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg text-white/90">
            Ervaar zelf hoe het is om bij Bootcamp Huissen te trainen. Vul je gegevens in en we nemen contact met je op om je proefles in te plannen.
          </p>
          <button
            onClick={scrollToForm}
            className="rounded-[5px] bg-white text-primary hover:bg-white/90 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Ja, ik wil een gratis proefles
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#f5f0eb]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-3 items-start">
            {/* Contactgegevens */}
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-secondary/70 mb-3">
                Contactgegevens
              </h3>
              <p className="font-sans text-xl font-semibold text-secondary tracking-tight mb-2">
                Bootcamp Huissen
              </p>
              <div className="space-y-2 text-secondary/80 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Huissen</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@bootcamphuissen.nl</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>06-12345678</span>
                </p>
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

            {/* Links */}
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-secondary/70 mb-3">
                Links
              </h3>
              <nav className="space-y-2 text-sm text-secondary/80">
                <a
                  href="#over-ons"
                  onClick={(e) => { e.preventDefault(); scrollToSection("over-ons") }}
                  className="block hover:text-primary transition-colors"
                >
                  Over ons
                </a>
                <a
                  href="#trainingen"
                  onClick={(e) => { e.preventDefault(); scrollToSection("trainingen") }}
                  className="block hover:text-primary transition-colors"
                >
                  Onze trainingen
                </a>
                <a
                  href="#tarieven"
                  onClick={(e) => { e.preventDefault(); scrollToSection("tarieven") }}
                  className="block hover:text-primary transition-colors"
                >
                  Tarieven
                </a>
                <a
                  href="#waarom-hier-trainen"
                  onClick={(e) => { e.preventDefault(); scrollToSection("waarom-hier-trainen") }}
                  className="block hover:text-primary transition-colors"
                >
                  Waarom hier trainen
                </a>
                <a
                  href="#aanmelden"
                  onClick={(e) => { e.preventDefault(); scrollToForm() }}
                  className="block hover:text-primary transition-colors"
                >
                  Gratis proefles aanvragen
                </a>
              </nav>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-sans text-sm font-semibold tracking-[0.18em] uppercase text-secondary/70 mb-3">
                Social
              </h3>
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
  benefits, 
  imageSrc,
  imageAlt,
  onCTAClick 
}: { 
  title: string
  subtitle: string
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-sans text-2xl font-semibold text-white tracking-tight uppercase">
            {title}
          </h3>
          <p className="text-white/90 text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <ul className="list-disc list-inside text-foreground/80 text-sm mb-6 mt-2 flex-grow space-y-1.5">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        <button
          onClick={onCTAClick}
          className="rounded-[5px] w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        >
          Gratis proefles
        </button>
      </div>
    </article>
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
