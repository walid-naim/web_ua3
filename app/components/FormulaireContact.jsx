'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from '../styles/FormulaireContact.module.css'
import { useLanguage } from '../contexts/LanguageContext'

// Form schema validation with dynamic error messages
const getSchema = (texts) => {
    return yup.object().shape({
        nom: yup.string().required(texts.nameRequired),
        email: yup.string().email(texts.emailInvalid).required(texts.emailRequired),
        message: yup.string().required(texts.messageRequired).min(10, texts.messageMinLength)
    });
}

export default function FormulaireContact() {
    const { language, texts } = useLanguage()
    const [formSubmitted, setFormSubmitted] = useState(false)

    const validationSchema = getSchema(texts)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = async (data) => {
        console.log('Form submitted:', data)

        // Simulating form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Reset form and show success message
        reset()
        setFormSubmitted(true)
    }

    const handleNewMessage = () => {
        setFormSubmitted(false)
    }

    if (formSubmitted) {
        return (
            <div className={styles.succes}>
                <h3>{texts.thankYou}</h3>
                <p>{texts.replyText}</p>
                <button onClick={handleNewMessage} className="bouton">
                    {texts.anotherMessage}
                </button>
            </div>
        )
    }

    return (
        <form className={styles.formulaire} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.groupeChamp}>
                <label htmlFor="nom">{texts.name}</label>
                <input
                    type="text"
                    id="nom"
                    className={styles.champTexte}
                    {...register('nom')}
                />
                {errors.nom && <span className={styles.erreur}>{errors.nom.message}</span>}
            </div>

            <div className={styles.groupeChamp}>
                <label htmlFor="email">{texts.email}</label>
                <input
                    type="email"
                    id="email"
                    className={styles.champTexte}
                    {...register('email')}
                />
                {errors.email && <span className={styles.erreur}>{errors.email.message}</span>}
            </div>

            <div className={styles.groupeChamp}>
                <label htmlFor="message">{texts.message}</label>
                <textarea
                    id="message"
                    className={styles.champTexte}
                    rows="5"
                    {...register('message')}
                ></textarea>
                {errors.message && <span className={styles.erreur}>{errors.message.message}</span>}
            </div>

            <button
                type="submit"
                className={styles.boutonEnvoi}
                disabled={isSubmitting}
            >
                {isSubmitting ? texts.sending : texts.send}
            </button>
        </form>
    )
}