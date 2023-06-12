"use client";
import React from "react";
import { Dropdown, Button, DropdownItem, cn } from 'rizzui';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { Text, Textarea,  FileInput, Checkbox, Radio  } from 'rizzui';
import { Input } from 'rizzui';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const validationSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    about: z.string().min(5, { message: " About is required" }),
    files: z.any().refine(val => val.length > 0,{ message: " File is required" } ),

    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    check: z.literal(true, {
      errorMap: () => ({ message: " checking is required" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;
export default function Home() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);
  return (

   
    <>
    
    <form onSubmit={handleSubmit(onSubmit)}>
       
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <Text className="text-base font-semibold leading-7 text-gray-900">Profile</Text>
        <Text className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you share.
        </Text>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            
            <div className="mt-2">
              <div className="">
                
                <Input
                  type="text"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  className={`block flex-1  ${
                    errors.username && "border-red-500"
                  }`}
                  
                  {...register("username")}
                />
                 {errors.username && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.username?.message}
            </p>
          )}
              </div>
            </div>
          </div>

          <div className="col-span-full">
            
            <div className="mt-2">
              <Textarea
                 label="About"
                 id="about"
                 className={` block   ${
                  errors.about && "border-red-500"
                } w-full`}

                {...register("about")}
              />

           {errors.about && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.about?.message}
            </p>
          )}
            </div>
            <Text className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</Text>
          </div>

          <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              { <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> }
              <Button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </Button>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                { <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> }
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                 
                    
                    <FileInput id="files" label="Upload File" 
                    className={`   ${
                      errors.about && "border-red-500"
                    } `}
                    {...register("files")}
                    />
                 
                   {errors.files && (
                    <p className="text-xs italic text-red-500 mt-2">
                       {errors.files?.message}
                    </p>
                        )}
                  
                </div>
                <Text className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <Text className="text-base font-semibold leading-7 text-gray-900">Personal Information</Text>
        <Text className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</Text>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
           
            <div className="mt-2">

              <Input
                label="First name"
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            
            <div className="mt-2">
              <Input
               label="last name"
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            
            <div className="mt-2">
              <Input
              label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full "
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Country
            </label>
            <div className="mt-2">
            <Dropdown
            trigger={
                <Button className=" flex w-auto" variant="outline">
                    United states <ChevronDownIcon className="ml-2 w-5" />
                </Button>
            }
            dropdownClassName="w-48 mt-4"
        >
            <DropdownItem className="mt-3 px-5 py-2" activeClassName="bg-gray-100">
                {({ active }) => (
                    <span className={cn('text-gray-600', active && '!text-gray-900')}>
                        Account Settings
                    </span>
                )}
            </DropdownItem>
            <DropdownItem className="px-5 py-2" activeClassName="bg-gray-100">
                {({ active }) => (
                    <span className={cn('text-gray-600', active && '!text-gray-900')}>
                        Support
                    </span>
                )}
            </DropdownItem>
            <DropdownItem className="px-5 py-2" activeClassName="bg-gray-100">
                {({ active }) => (
                    <span className={cn('text-gray-600', active && '!text-gray-900')}>
                        License
                    </span>
                )}
            </DropdownItem>
            <DropdownItem className="mb-3 px-5 py-2" activeClassName="bg-gray-100">
                {({ active }) => (
                    <span className={cn('text-gray-600', active && '!text-gray-900')}>
                        Sign Out
                    </span>
                )}
            </DropdownItem>
        </Dropdown>
            </div>
          </div>

          <div className="col-span-full">
            
            <div className="mt-2">
              <Input
                label="Street address"
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full "
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
           
            <div className="mt-2">
              <Input
              label=" City "
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full "
              />
            </div>
          </div>

          <div className="sm:col-span-2">
           
            <div className="mt-2">
              <Input
              label="State / Province"
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full "
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            
            <div className="mt-2">
              <Input
              label="ZIP / Postal code"
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <Text className="text-base font-semibold leading-7 text-gray-900">Notifications</Text>
        <Text className="mt-1 text-sm leading-6 text-gray-600">
          We'll always let you know about important changes, but you pick what else you want to hear about.
        </Text>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Comments" 
                id="check"
                {...register("check")}
                />
                  {errors.check && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.check?.message}
            </p>
          )}
                </div>
                <div className="text-sm leading-6">
                  
                  <Text className="text-gray-500">Get notified when someones posts a comment on a posting.</Text>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Candidates" />
                </div>
                <div className="text-sm leading-6">
                 
                  <Text className="text-gray-500">Get notified when a candidate applies for a job.</Text>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Offers" />
                </div>
                <div className="text-sm leading-6">
                  
                  <Text className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</Text>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
              <Radio label="Everything" />
                
              </div>
              <div className="flex items-center gap-x-3">
              <Radio label="Same as email" />
                
                
              </div>
              <div className="flex items-center gap-x-3">
              <Radio label=" No push notifications" />
                
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-end gap-x-6">
    <Button color="warning">Cancel</Button>
    <Button  type="submit" color="primary">Save</Button>

    <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
    </div>
   
  </form>
  </> 
    
  );
};
