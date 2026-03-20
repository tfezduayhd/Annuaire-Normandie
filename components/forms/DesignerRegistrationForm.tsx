"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronLeft, ChevronRight, Upload, X } from "lucide-react"

import {
  designerRegistrationSchema,
  type DesignerRegistrationInput,
} from "@/lib/validations/designer"
import {
  DISCIPLINES,
  TERRITORIES,
  SENIORITIES,
  STRUCTURES,
  TRANSITION_FOCUSES,
} from "@/lib/constants"
import { cn } from "@/lib/utils"
import { fadeInUp } from "@/lib/animations"
import { Button } from "@/components/ui/Button"
import { Tag } from "@/components/ui/Tag"

const STEPS = ["Qui es-tu ?", "Ton activité", "Tes engagements"] as const

const inputClasses =
  "w-full rounded-sm border border-flint/30 bg-white px-4 py-3 text-sm text-ink placeholder:text-flint/50 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
const labelClasses = "block text-sm font-medium text-ink mb-1.5"
const errorClasses = "text-xs text-red-600 mt-1"

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

// Fields validated per step for partial validation
const stepFields: (keyof DesignerRegistrationInput)[][] = [
  ["firstName", "lastName", "email", "phone", "city", "territory"],
  ["disciplines", "specialties", "seniority", "structure", "companyName", "bio"],
  [
    "websiteUrl",
    "linkedinUrl",
    "instagramUrl",
    "behanceUrl",
    "transitionFocus",
    "isOpenToCollaboration",
    "isOpenToMentoring",
    "isVolunteer",
  ],
]

export function DesignerRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rgpdConsent, setRgpdConsent] = useState(false)
  const [localMessage, setLocalMessage] = useState("")
  const [specialtyInput, setSpecialtyInput] = useState("")

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<DesignerRegistrationInput>({
    resolver: zodResolver(designerRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      territory: undefined,
      photoUrl: "",
      disciplines: [],
      specialties: [],
      seniority: undefined,
      structure: undefined,
      companyName: "",
      bio: "",
      websiteUrl: "",
      linkedinUrl: "",
      instagramUrl: "",
      behanceUrl: "",
      transitionFocus: [],
      isOpenToCollaboration: false,
      isOpenToMentoring: false,
      isVolunteer: false,
    },
    mode: "onTouched",
  })

  const watchedDisciplines = watch("disciplines")
  const watchedSpecialties = watch("specialties")
  const watchedStructure = watch("structure")
  const watchedBio = watch("bio")
  const watchedTransitionFocus = watch("transitionFocus")

  async function goToNext() {
    const fieldsToValidate = stepFields[currentStep]
    const valid = await trigger(fieldsToValidate)
    if (!valid) return
    setDirection(1)
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goToPrev() {
    setDirection(-1)
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  function toggleDiscipline(key: string) {
    const current = getValues("disciplines")
    const typedKey = key as DesignerRegistrationInput["disciplines"][number]
    if (current.includes(typedKey)) {
      setValue(
        "disciplines",
        current.filter((d) => d !== typedKey),
        { shouldValidate: true }
      )
    } else if (current.length < 5) {
      setValue("disciplines", [...current, typedKey], { shouldValidate: true })
    }
  }

  function toggleTransitionFocus(key: string) {
    const current = getValues("transitionFocus")
    const typedKey = key as DesignerRegistrationInput["transitionFocus"][number]
    if (current.includes(typedKey)) {
      setValue(
        "transitionFocus",
        current.filter((t) => t !== typedKey),
        { shouldValidate: true }
      )
    } else {
      setValue("transitionFocus", [...current, typedKey], {
        shouldValidate: true,
      })
    }
  }

  function addSpecialty() {
    const trimmed = specialtyInput.trim()
    if (!trimmed) return
    const current = getValues("specialties")
    if (!current.includes(trimmed)) {
      setValue("specialties", [...current, trimmed])
    }
    setSpecialtyInput("")
  }

  function removeSpecialty(value: string) {
    const current = getValues("specialties")
    setValue(
      "specialties",
      current.filter((s) => s !== value)
    )
  }

  async function onSubmit(data: DesignerRegistrationInput) {
    if (!rgpdConsent) return
    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Registration data:", data, "Message:", localMessage)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="flex flex-col items-center gap-6 py-16 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
          <CheckCircle className="h-8 w-8 text-moss" />
        </div>
        <h2 className="font-display text-display-md italic text-ink">
          Inscription envoyée !
        </h2>
        <p className="max-w-md text-flint">
          Merci pour ton inscription. Nous examinerons ton profil et te
          recontacterons très prochainement.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (i < currentStep) {
                  setDirection(-1)
                  setCurrentStep(i)
                }
              }}
              className={cn(
                "font-mono text-xs uppercase tracking-wider transition-colors",
                i === currentStep
                  ? "text-moss"
                  : i < currentStep
                    ? "cursor-pointer text-ink hover:text-moss"
                    : "text-flint/50"
              )}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-flint/10">
          <motion.div
            className="h-full rounded-full bg-moss"
            initial={false}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Step 1: Qui es-tu ? */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClasses}>
                      Prénom *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={inputClasses}
                      placeholder="Ton prénom"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className={errorClasses}>
                        Le prénom doit contenir au moins 2 caractères.
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClasses}>
                      Nom *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={inputClasses}
                      placeholder="Ton nom"
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className={errorClasses}>
                        Le nom doit contenir au moins 2 caractères.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClasses}
                    placeholder="ton@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className={errorClasses}>
                      Merci de saisir une adresse email valide.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClasses}
                    placeholder="06 12 34 56 78"
                    {...register("phone")}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClasses}>
                      Ville *
                    </label>
                    <input
                      id="city"
                      type="text"
                      className={inputClasses}
                      placeholder="Ta ville"
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className={errorClasses}>
                        La ville doit contenir au moins 2 caractères.
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="territory" className={labelClasses}>
                      Département *
                    </label>
                    <select
                      id="territory"
                      className={inputClasses}
                      {...register("territory")}
                    >
                      <option value="">Sélectionner</option>
                      {Object.entries(TERRITORIES).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.territory && (
                      <p className={errorClasses}>
                        Merci de sélectionner un département.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="photo" className={labelClasses}>
                    Photo de profil
                  </label>
                  <label
                    htmlFor="photo"
                    className={cn(
                      inputClasses,
                      "flex cursor-pointer items-center gap-3 text-flint/50"
                    )}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choisir un fichier</span>
                  </label>
                  <input id="photo" type="file" accept="image/*" className="hidden" />
                  <p className="mt-1 text-xs text-flint">
                    JPG ou PNG, 2 Mo maximum
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Ton activité */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <p className={labelClasses}>
                    Disciplines * <span className="font-normal text-flint">(1 à 5)</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(DISCIPLINES).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleDiscipline(key)}
                      >
                        <Tag active={watchedDisciplines?.includes(key as DesignerRegistrationInput["disciplines"][number])}>
                          {label}
                        </Tag>
                      </button>
                    ))}
                  </div>
                  {errors.disciplines && (
                    <p className={errorClasses}>
                      Sélectionne entre 1 et 5 disciplines.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="specialtyInput" className={labelClasses}>
                    Spécialités
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="specialtyInput"
                      type="text"
                      className={cn(inputClasses, "flex-1")}
                      placeholder="Ex : branding, packaging…"
                      value={specialtyInput}
                      onChange={(e) => setSpecialtyInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSpecialty()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={addSpecialty}
                    >
                      Ajouter
                    </Button>
                  </div>
                  {watchedSpecialties && watchedSpecialties.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watchedSpecialties.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => removeSpecialty(s)}
                          className="group"
                        >
                          <Tag active>
                            <span className="flex items-center gap-1">
                              {s}
                              <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                            </span>
                          </Tag>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className={labelClasses}>Expérience *</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {Object.entries(SENIORITIES).map(([key, label]) => (
                      <label
                        key={key}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition-colors",
                          watch("seniority") === key
                            ? "border-moss bg-moss/5"
                            : "border-flint/30 hover:border-flint/50"
                        )}
                      >
                        <input
                          type="radio"
                          value={key}
                          className="accent-moss"
                          {...register("seniority")}
                        />
                        <span className="text-sm text-ink">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.seniority && (
                    <p className={errorClasses}>
                      Merci de sélectionner ton niveau d&apos;expérience.
                    </p>
                  )}
                </div>

                <div>
                  <p className={labelClasses}>Structure *</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {Object.entries(STRUCTURES).map(([key, label]) => (
                      <label
                        key={key}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition-colors",
                          watch("structure") === key
                            ? "border-moss bg-moss/5"
                            : "border-flint/30 hover:border-flint/50"
                        )}
                      >
                        <input
                          type="radio"
                          value={key}
                          className="accent-moss"
                          {...register("structure")}
                        />
                        <span className="text-sm text-ink">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.structure && (
                    <p className={errorClasses}>
                      Merci de sélectionner ton type de structure.
                    </p>
                  )}
                </div>

                {watchedStructure && watchedStructure !== "FREELANCE" && (
                  <motion.div {...fadeInUp}>
                    <label htmlFor="companyName" className={labelClasses}>
                      Nom de la structure *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      className={inputClasses}
                      placeholder="Nom de ton agence, entreprise…"
                      {...register("companyName")}
                    />
                    {errors.companyName && (
                      <p className={errorClasses}>
                        Le nom de la structure est requis.
                      </p>
                    )}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="bio" className={labelClasses}>
                    Bio *{" "}
                    <span className="font-normal text-flint">
                      ({watchedBio?.length || 0}/500)
                    </span>
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className={inputClasses}
                    placeholder="Présente-toi en quelques mots… (100 caractères minimum)"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className={errorClasses}>
                      La bio doit contenir entre 100 et 500 caractères.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Tes engagements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="websiteUrl" className={labelClasses}>
                      Site web
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      className={inputClasses}
                      placeholder="https://tonsite.fr"
                      {...register("websiteUrl")}
                    />
                    {errors.websiteUrl && (
                      <p className={errorClasses}>URL invalide.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="linkedinUrl" className={labelClasses}>
                      LinkedIn
                    </label>
                    <input
                      id="linkedinUrl"
                      type="url"
                      className={inputClasses}
                      placeholder="https://linkedin.com/in/…"
                      {...register("linkedinUrl")}
                    />
                    {errors.linkedinUrl && (
                      <p className={errorClasses}>URL invalide.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="instagramUrl" className={labelClasses}>
                      Instagram
                    </label>
                    <input
                      id="instagramUrl"
                      type="url"
                      className={inputClasses}
                      placeholder="https://instagram.com/…"
                      {...register("instagramUrl")}
                    />
                    {errors.instagramUrl && (
                      <p className={errorClasses}>URL invalide.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="behanceUrl" className={labelClasses}>
                      Behance
                    </label>
                    <input
                      id="behanceUrl"
                      type="url"
                      className={inputClasses}
                      placeholder="https://behance.net/…"
                      {...register("behanceUrl")}
                    />
                    {errors.behanceUrl && (
                      <p className={errorClasses}>URL invalide.</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className={labelClasses}>Engagements pour la transition</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(TRANSITION_FOCUSES).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleTransitionFocus(key)}
                      >
                        <Tag active={watchedTransitionFocus?.includes(key as DesignerRegistrationInput["transitionFocus"][number])}>
                          {label}
                        </Tag>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-moss"
                      {...register("isOpenToCollaboration")}
                    />
                    <span className="text-sm text-ink">
                      Je suis ouvert·e aux collaborations
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-moss"
                      {...register("isOpenToMentoring")}
                    />
                    <span className="text-sm text-ink">
                      Je suis disponible pour du mentorat
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-moss"
                      {...register("isVolunteer")}
                    />
                    <span className="text-sm text-ink">
                      Je suis bénévole pour les événements
                    </span>
                  </label>
                </div>

                <div>
                  <label htmlFor="localMessage" className={labelClasses}>
                    Un message à nous transmettre ?
                  </label>
                  <textarea
                    id="localMessage"
                    rows={3}
                    className={inputClasses}
                    placeholder="Dis-nous en plus…"
                    value={localMessage}
                    onChange={(e) => setLocalMessage(e.target.value)}
                  />
                </div>

                <div className="rounded-sm border border-flint/20 bg-chalk p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded accent-moss"
                      checked={rgpdConsent}
                      onChange={(e) => setRgpdConsent(e.target.checked)}
                    />
                    <span className="text-xs leading-relaxed text-flint">
                      J&apos;accepte que mes données soient traitées par Design
                      Lab Normandie dans le cadre de cet annuaire, conformément
                      à la politique de confidentialité. Je peux demander la
                      suppression de mes données à tout moment. *
                    </span>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {currentStep > 0 ? (
            <Button type="button" variant="ghost" onClick={goToPrev}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Précédent
            </Button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length - 1 ? (
            <Button type="button" variant="primary" onClick={goToNext}>
              Suivant
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="moss"
              disabled={!rgpdConsent || isSubmitting}
            >
              {isSubmitting ? "Envoi en cours…" : "Envoyer mon inscription"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
