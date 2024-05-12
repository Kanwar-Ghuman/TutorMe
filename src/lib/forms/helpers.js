import { NextResponse } from 'next/server';

export function validateForm(schema, form) {
    try {
        const validated = schema.parse(form)
        return { isValid: true }
    } catch (error) {
        return { isValid: false, error: NextResponse.json({error: error.errors}, { status: 400 }) }
    }
}