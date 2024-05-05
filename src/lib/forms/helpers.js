export function validateForm(schema, form) {
    try {
        const validated = schema.parse(form)
        return { isValid: true }
    } catch (error) {
        return { isValid: false, error: error.errors }
    }
}