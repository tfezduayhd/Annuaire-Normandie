"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle, Send } from "lucide-react"

import {
  contactFormSchema,
  type ContactFormInput,
} from "@/lib/validations/contact"
import { CONTACT_TYPES } from "@/lib/constants"

import { Button } from "@/components/ui/Button"

const inputClasses =
  "w-full border border-flint/30 bg-white px-4 py-3 text-sm text-ink placeholder:text-flint/50 focus:border-moss focus:outline-none focus:ring-1 focus:ring-moss"
const labelClasses = "block text-sm font-medium text-ink mb-1.5"
const errorClasses = "text-xs text-red-600 mt-1"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      type: undefined,
      subject: "",
      message: "",
    },
    mode: "onTouched",
  })

  async function onSubmit(data: ContactFormInput) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.log("Contact form data:", data)
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
        <h2 className="font-display text-display-md font-bold text-ink">
          Message envoyé !
        </h2>
        <p className="max-w-md text-flint">
          Merci pour ton message. Nous te répondrons dans les meilleurs délais.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Nom *
          </label>
          <input
            id="contact-name"
            type="text"
            className={inputClasses}
            placeholder="Ton nom"
            {...register("name")}
          />
          {errors.name && (
            <p className={errorClasses}>
              Le nom doit contenir au moins 2 caractères.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email *
          </label>
          <input
            id="contact-email"
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
      </div>

      <div>
        <label htmlFor="contact-type" className={labelClasses}>
          Tu es… *
        </label>
        <select
          id="contact-type"
          className={inputClasses}
          {...register("type")}
        >
          <option value="">Sélectionner</option>
          {Object.entries(CONTACT_TYPES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className={errorClasses}>Merci de sélectionner une catégorie.</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClasses}>
          Objet *
        </label>
        <input
          id="contact-subject"
          type="text"
          className={inputClasses}
          placeholder="L'objet de ton message"
          {...register("subject")}
        />
        {errors.subject && (
          <p className={errorClasses}>
            L&apos;objet doit contenir au moins 5 caractères.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={inputClasses}
          placeholder="Ton message… (20 caractères minimum)"
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClasses}>
            Le message doit contenir entre 20 et 2000 caractères.
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" variant="moss" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            "Envoi en cours…"
          ) : (
            <>
              Envoyer
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
