"use client"
import { FormField, QuestionType } from "@/components/editor/field";
import { create } from 'zustand';
import { nanoid} from 'nanoid'
// Define the types
export type FormData = {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];    
};

// Store interface
interface Store {
    formData: FormData | null;
    history: FormData[];
    preview:boolean;
    setFormData: (form: FormData|null) => void;
    isSaved: boolean;
    setSaved: (save: boolean) => void;
    addField: (type?:QuestionType) => void;
    removeField: (id: string) => void;
    changeFormMetaData: ({ title, description }: { title?: string, description?: string }) => void;
    reOrderFields: (fields: FormField[]) => void;
    clearFields: () => void;
    changeFieldMetaData: ({ id, title, description }: { id: string; title?: string; description?: string }) => void;
    addOptionField:({ id, type}: { id: string; type:QuestionType})=>void;
    editOptionField:({ id, options }: { id: string; options:string[] })=>void;
    changeFieldType:({ id, type}: { id: string; type:QuestionType})=>void;
    addOption: ({ id}: { id: string;})=>void;
    EditOption: ({ id, name, index}: { id: string;name:string, index:number})=>void;
    DeleteOption: ({ id, index}: { id: string; index:number})=>void;
    pushHistory:(form:FormData)=>void;
    popHistory:()=>void;
    setCurrentFormData:(i:number)=>void;
    AddImageToField: ({ id, image }: { id: string, image: string }) => void;
    ToggleFieldRequired: ({ id}:{id:string})=>void,
    TogglePreview:()=>void;
}

// Create Zustand store
export const useEditorStore = create<Store>((set) => ({
    formData: null,
    preview:true,
    history:[],
    setFormData: (form) => set({ formData: form }),
    isSaved: true,
    setSaved: (save) => set({ isSaved: save}),
    
    // Add a new field to the form
    addField: (type?:QuestionType) => {
        set((state) => {
            if (state.formData) {
                const emptyField: FormField = {
                    id: nanoid(6+state.formData.fields.length),
                    title: 'untitled field',
                    type: type||QuestionType.ShortAns,  // Assuming 'ShortAns' is a valid QuestionType
                    options:[],
                    image: null
                };
                const updatedFormData: FormData = {
                    ...state.formData,
                    fields: [...state.formData.fields, emptyField],
                };
                
                return { formData: updatedFormData };
            }
            return state;
        });
    },

    // Remove a field from the form by index
    removeField: (id: string) => {
        set((state) => {
            if (state.formData) {
                const updatedFormData: FormData = {
                    ...state.formData,
                    fields: state.formData.fields.filter((field) => field.id !== id),
                };
                
                return { formData: updatedFormData };
            }
            return state;
        });
    },

    // Change the form's title and/or description
    changeFormMetaData: ({ title, description }: { title?: string; description?: string }) => {
        set((state) => {
            if (state.formData) {
                const updatedForm = { ...state.formData };
                if (title) updatedForm.title = title;
                if (description) updatedForm.description = description;
                state.pushHistory(updatedForm);
                return { formData: updatedForm };
            }
            return state;
        });
    },

    // Reorder the fields in the form
    reOrderFields: (fields: FormField[]) => {
        set((state) => {
            if (state.formData) {
              const updatedFormData = {
                ...state.formData,
                fields
              }
              
                return {
                    formData:updatedFormData,
                  
                };
            }
            return state;
        });
    },

    // Clear all fields in the form
    clearFields: () => {
        set((state) => {
            if (state.formData) {
              const updatedFormData = {
                ...state.formData,
                fields:[]
              }
              
                return {
                    formData:updatedFormData,
                  
                };
            }
            return state;
        });
    },
    changeFieldMetaData: ({ id, title, description }) =>
        set((state) => {
          if (state.formData) {
            const updatedFields = state.formData.fields.map((field) =>
              field.id === id
                ? {
                    ...field,
                    ...(title !== undefined && { title }),
                    ...(description !== undefined && { description }),
                  }
                : field
            );
            const updatedFormData = {
              ...state.formData,
              fields: updatedFields
            }
            return {
              formData: updatedFormData,
            
            };
          }
          return state;
        }),
    addOptionField: ({ id ,type}) =>
        set((state) => {
          if (state.formData) {
            const updatedFields = state.formData.fields.map((field) =>
              field.id === id
                ? {
                    ...field,
                   options: field.options.length<1 ? ['option']: field.options,
                   type
                  }
                : field
            );
            const updatedFormData = {
              ...state.formData,
              fields: updatedFields
            }
            return {
              formData: updatedFormData,
            
            };
          }
          return state;
        }),       
    editOptionField: ({ id, options }) =>
        set((state) => {
          if (state.formData) {
            const updatedFields = state.formData.fields.map((field) =>
              field.id === id
                ? {
                    ...field,
                   options: options,
                  }
                : field
            );
            const updatedFormData = {
              ...state.formData,
              fields: updatedFields
            }
            return {
              formData: updatedFormData,
            
            };
          }
          return state;
        }),
        changeFieldType: ({ id ,type}) =>
            set((state) => {
              if (state.formData) {
                const updatedFields = state.formData.fields.map((field) =>
                  field.id === id
                    ? {
                        ...field,
                       type,
                       options: field.options.length<1 ? []: field.options
                      }
                    : field
                );
                const updatedFormData = {
                  ...state.formData,
                  fields: updatedFields
                }
                return {
                  formData: updatedFormData,
                
                };
              }
              return state;
            }),
            addOption: ({ id }) =>
              set((state) => {
                if (state.formData) {
                  const updatedFields = state.formData.fields.map((field) =>
                    field.id === id
                      ? {
                          ...field,
                         options: [...field.options!, 'option-'+field.options?.length+1],
                        }
                      : field
                  );
                  const updatedFormData = {
                    ...state.formData,
                    fields: updatedFields
                  }
                  return {
                    formData: updatedFormData,
                  
                  };
                }
                return state;
              }),   
            EditOption: ({ id , name,index}) =>
              set((state) => {
                if (state.formData) {
                  const updatedFields = state.formData.fields.map((field) =>
                    field.id === id
                      ? {
                          ...field,
                         options: field.options?.map((option,i)=>i===index ? name: option ),
                        }
                      : field
                  );
                  const updatedFormData = {
                    ...state.formData,
                    fields: updatedFields
                  }
                  return {
                    formData: updatedFormData,
                  
                  };
                }
                return state;
              }),   
              pushHistory: (form)=> set((state)=>({history:[...state.history, form]})),
              popHistory:()=>set((state)=>({history: state.history.slice(0,-1)})),
              setCurrentFormData:(i)=>set((state)=>{
                const currentForm = state.history.find((_,index)=>i===index);
                return {formData: currentForm||state.formData}
              }),
              AddImageToField: ({ id, image }) => {
                set((state) => {
                    if (state.formData) {
                        const updatedFields = state.formData.fields.map((field) =>
                            field.id === id ? { ...field, image } : field
                        );
                        return {
                            formData: { ...state.formData, fields: updatedFields },
                        };
                    }
                    return state;
                });
            },
            DeleteOption: ({ id ,index}) =>
              set((state) => {
                if (state.formData) {
                  const updatedFields = state.formData.fields.map((field) =>
                    field.id === id
                      ? {
                          ...field,
                         options: field.options?.filter((_,i)=>i!==index)
                        }
                      : field
                  );
                  const updatedFormData = {
                    ...state.formData,
                    fields: updatedFields
                  }
                  return {
                    formData: updatedFormData,
                  
                  };
                }
                return state;
              }),   
              ToggleFieldRequired: ({ id}) =>
                set((state) => {
                  if (state.formData) {
                    const updatedFields = state.formData.fields.map((field) =>
                      field.id === id
                        ? {
                            ...field,
                           required: !field.required
                          }
                        : field
                    );
                    const updatedFormData = {
                      ...state.formData,
                      fields: updatedFields
                    }
                    return {
                      formData: updatedFormData,
                    
                    };
                  }
                  return state;
                }),
                TogglePreview: ()=>set((prev)=>({preview: !prev.preview}))
}));
