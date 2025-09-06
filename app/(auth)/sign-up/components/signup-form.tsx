"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { StudentSchema, StudentT } from "@/app/schemas/students";
import Input from "@/components/fayida-custom-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const cities = ["Addis Ababa", "Bahir Dar", "Mekelle"];
const regions = ["Addis Ababa", "Amhara", "Tigray"];
const referralOptions = [
  "Friend",
  "TICTOK",
  "Facebook",
  "Instagram",
  "SCHOOL",
  "AGENT",
  "Other",
];

const grades = [
  { id: "1", name: "Grade 9" },
  { id: "2", name: "Grade 10" },
  { id: "3", name: "Grade 11" },
  { id: "4", name: "Grade 12" },
];

interface Props {}

const SignupForm: React.FC<Props> = ({}) => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentT>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      city: "",
      region: "",
      referralSource: "Other",
      grade: grades[0]?.id || "",
    },
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit: SubmitHandler<StudentT> = async (data) => {
    if (confirmPassword !== data.password) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            fullName: `${data.firstName} ${data.lastName}`,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const user = authData.user;

      if (!user) {
        throw new Error("User creation failed");
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        grand_name: data.grandName,
        age: data.age,
        school_name: data.schoolName,
        city: data.city,
        region: data.region,
        email: data.email,
        grade: grades.find((g) => g.id === data.grade)?.name,
        referral_source: data.referralSource,
      });

      if (profileError) {
        throw new Error(profileError.message);
      }

      toast.success(
        "Registration successful! Please check your email to confirm."
      );
      router.push("/sign-in");
    } catch (e: any) {
      toast.error(`Failed to register: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <Label>First Name *</Label>
              <Input {...register("firstName")} className="w-full" />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-full">
              <Label>Last Name *</Label>
              <Input {...register("lastName")} className="w-full" />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label>Grand Name *</Label>
            <Input {...register("grandName")} className="w-full" />
            {errors.grandName && (
              <p className="text-red-500">{errors.grandName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <Label>Age *</Label>
              <Input
                type="number"
                {...register("age", { valueAsNumber: true })}
                className="w-full"
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>

            <div className="w-full">
              <Label>Grade *</Label>
              <select
                className="w-full border rounded block px-4 py-3 mt-2"
                {...register("grade")}
              >
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="text-red-500">{errors.grade.message}</p>
              )}
            </div>
          </div>

          <Button onClick={nextStep} className="w-full sm:w-auto">
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="w-full">
            <Label>Email *</Label>
            <Input {...register("email")} className="w-full" />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <Label>Password *</Label>
              <Input
                type="password"
                {...register("password")}
                className="w-full"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="w-full">
              <Label>Confirm Password *</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <Button
              variant="secondary"
              onClick={prevStep}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button onClick={nextStep} className="w-full sm:w-auto">
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="w-full">
            <Label>School Name *</Label>
            <Input {...register("schoolName")} className="w-full" />
            {errors.schoolName && (
              <p className="text-red-500">{errors.schoolName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <Label>City *</Label>
              <select
                className="w-full border rounded block px-4 py-3 mt-2"
                {...register("city")}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="w-full">
              <Label>Region *</Label>
              <select
                className="w-full border rounded block px-4 py-3 mt-2"
                {...register("region")}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500">{errors.region.message}</p>
              )}
            </div>
          </div>

          <div className="w-full">
            <Label>Referral Source *</Label>
            <select
              className="w-full border rounded block px-4 py-3 mt-2"
              {...register("referralSource")}
            >
              {referralOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.referralSource && (
              <p className="text-red-500">{errors.referralSource.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <Button
              variant="secondary"
              onClick={prevStep}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                  Registering
                </>
              ) : (
                <span>Create Account</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignupForm;
