"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export function FormDropDownInput(props) {
  const requiredAsterik = props.isRequired ? <span className="text-destructive">*</span> : ""
  return (
        <FormField
          {...props}
          control={props.form.control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.label} {requiredAsterik}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={props.placeholder} />
                  </SelectTrigger>
                </FormControl>
                
                  
                  
                <SelectContent>
                  {(props.options || []).map((group) => (
                    <SelectGroup>
                      {group.label ? <SelectLabel>{group.label}</SelectLabel> : ""}
                      {(group.group || []).map((option) => (
                        <SelectItem value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              {field.name in props.form.formState.errors ? 
                  <FormMessage /> :
                  <FormDescription>
                    {props.description}
                  </FormDescription>
              }
            </FormItem>
          )}
        />
  )
}
