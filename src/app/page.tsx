"use client";
import React , { FormEvent, useState } from "react";
import { Dropdown, Button, DropdownItem, cn } from 'rizzui';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Text, Textarea,  FileInput, Checkbox, Radio, NativeSelect  } from 'rizzui';
import { Input } from 'rizzui';

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const loginInfoSchema = z
  .object({
    username: z.string().min(1),
    select: z.string().min(1),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    streetaddress: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    postalcode: z.string().min(1),
    about: z.string().min(5),
    files: z.any().refine(val => val.length > 0 ),
    check: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    
  });
  
  type SignInType = z.infer<typeof loginInfoSchema>;

export default function Home () {

 

  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  }); */

  //const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm<SignInType>({
    resolver: zodResolver(loginInfoSchema),
  });

  // TO-DO: Send data to API onSubmit.
  function handleFormSubmit(data: SignInType) {
    console.log('Submitted data', data);
    reset();
   
  }
  
  const handleCancel = () => {
    reset(); // Reset the form inputs
  };
  
  
  return (

   
    <div className="mx-auto max-w-2xl my-[100px]">
    
    <form noValidate onSubmit={handleSubmit((d) => handleFormSubmit(d))}>
       
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
                  labelClassName="block text-sm font-medium leading-6 text-gray-900 "
                  inputClassName="shadow-sm "
                  id="username"
                 // autoComplete="username"
                  error = {errors.username && "Username is required" }
                  
                  {...register("username")}
                />
                
              </div>
            </div>
          </div>

          <div className="col-span-full">
            
            <div className="mt-2">
              <Textarea
               labelClassName="block text-sm font-medium leading-6 text-gray-900 "
               className="shadow-sm "
                 label="About"
                 id="about"
                 //className={` block   ${
                 // errors.about && "border-red-500"
                //}shadow-sm `}
                error = {errors.username && "About is required" }
                {...register("about")}
              />

           
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
                size="sm"
                className="rounded-md bg-white px-2.5 py-1.5  text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                    labelClassName="block text-sm font-medium leading-6 text-gray-900 "
                    inputClassName="shadow-sm "
                    //error="This is error message!"
                    error = {errors.files && "File is required" }
                    {...register("files")}
                    />
                  
                  
                 
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
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
                label="First name"
                type="text"
               
                id="firstname"
                autoComplete="given-name"
                className="block w-full"
                error = {errors.firstname && "Firstname is required" }
                {...register("firstname")}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
               label="last name"
                type="text"
                
                id="lastname"
                autoComplete="family-name"
                className="block w-full"
                error = {errors.lastname && "Lastname is required" }
                {...register("lastname")}
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
              label="Email address"
                id="email"
                
                type="email"
                autoComplete="email"
                className="block w-full "
                error = {errors.email && "Email is required" }
                {...register("email")}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
           
            <div className="mt-2">
            <NativeSelect
            labelClassName="block text-sm font-medium leading-6 text-gray-900 "
            className="shadow-sm "
            id="select"
            label="Country"
            size="lg"
            options={['United States', 'Canada', 'Mexico']}
            {...register("select")}
            error = {errors.select && "Country is required" }
        />

               

            </div>
          </div>

          <div className="col-span-full">
            
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
                label="Street address"
                type="text"
                
                id="streetaddress"
                autoComplete="street-address"
                className="block w-full "
                error = {errors.streetaddress && "Street address is required" }
                {...register("streetaddress")}
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
           
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
              label=" City "
                type="text"
                
                id="city"
                autoComplete="address-level2"
                className="block w-full "
                error = {errors.city && "City is required" }
                {...register("city")}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
           
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
              label="State / Province"
                type="text"
               
                id="region"
                autoComplete="address-level1"
                className="block w-full "
                error = {errors.region && "State is required" }
                {...register("region")}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            
            <div className="mt-2">
              <Input
              labelClassName="block text-sm font-medium leading-6 text-gray-900 "
              inputClassName="shadow-sm "
              label="ZIP / Postal code"
                type="text"
                
                id="postalcode"
                autoComplete="postal-code"
                className="block w-full "
                error = {errors.postalcode && "ZIP is required" }
                {...register("postalcode")}
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
              <div className=" gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Comments" 
                id="check"
                {...register("check")}
                error = {errors.check && "Checking is required" }
                />
                 
                </div>
                <div className="text-sm leading-6 ml-[25px]">
                  
                  <Text className="text-gray-500">Get notified when someones posts a comment on a posting.</Text>
                </div>
              </div>
              <div className=" gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Candidates" />
                </div>
                <div className="text-sm leading-6 ml-[25px]">
                 
                  <Text className="text-gray-500">Get notified when a candidate applies for a job.</Text>
                </div>
              </div>
              <div className=" gap-x-3">
                <div className="flex h-6 items-center">
                <Checkbox label="Offers" />
                </div>
                <div className="text-sm leading-6 ml-[25px]">
                  
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
    <Button  variant="text" onClick={handleCancel}>Cancel</Button>
    <Button  type="submit" color="primary" >Save</Button>

   
    </div>
   
  </form>
  </div> 
    
  );
};
