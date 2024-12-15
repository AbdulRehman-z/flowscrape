"use client"

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/verification-action";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function VerificationForm() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {

    if (!token) {
      setError("Token missing!")
      return
    }

    newVerification(token).then((data) => {
      if (data.error) {
        setError(error)
      } else {
        setSuccess(data.success!)
      }
    }).catch(() => {
      setError("Something went wrong!")
    })
  }, [token, error])

  useEffect(() => {
    onSubmit()

  }, [onSubmit])


  return (
    <CardWrapper headerLabel="Confirming your verification" titleFooter="login" backButtonHref="/auth/login" backButtonLabel="Back to login">
      <div className="flex justify-center flex-col items-center">
        {!success && !error &&
          <BeatLoader />
        }
        <FormSuccess message={success} />
        {!success && <FormError message={error} />
        }
      </div>
    </CardWrapper>
  )
}
