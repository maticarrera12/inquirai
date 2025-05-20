'use client'
import { AskQuestionSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const QuestionForm = () => {

    const form = useForm({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues:{
            title:"",
            content:"",
            tags:[],
        }
    })

    const handleCreateQuestion= ()=> {}

  return (
    <Form {...form}>
        <form className='flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateQuestion)}>
            <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                             Titulo de la pregunta <span className='text-primary-500'>*</span>
                            </FormLabel>
                            <FormControl>
                              <Input                   
                                className="paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 no-focus min-h-[56px]
                              border"
                             {...field}
                              />
                            </FormControl>
                            <FormDescription className='body-regular text-light-500 mt-2.5'>
                                Se especifico e imagina que le estas haciendo la pregunta a otra persona.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
            <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                             Detalla tu pregunta{" "}<span className='text-primary-500'>*</span>
                            </FormLabel>
                            <FormControl>
                              Editor
                            </FormControl>
                            <FormDescription className='body-regular text-light-500 mt-2.5'>
                               
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
            <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                             Tags <span className='text-primary-500'>*</span>
                            </FormLabel>
                            <FormControl>
                                <div>
                                    <Input                   
                                className="paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 no-focus min-h-[56px]
                              border"
                             {...field}
                             placeholder='Agrega tags'
                              /> 
                              Tags
                                </div>
                             
                            </FormControl>
                            <FormDescription className='body-regular text-light-500 mt-2.5'>
                                Agrega hasta 5 tags para describir sobre qué es tu pregunta. Necesitas presionar enter después de cada tag.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className='mt-16 flex justify-end'>
                        <Button className='primary-gradient w-fit !text-light-900'>
                            Haz tu pregunta
                        </Button>
                      </div>
        </form>
    </Form>
  )
}

export default QuestionForm