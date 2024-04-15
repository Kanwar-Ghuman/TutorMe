import { NextResponse } from 'next/server'

const data = [
    {
        "Hello": "world",
    },
    {
        "Bello": "go around"
    }
]
export async function GET() {
    return NextResponse.json(data);
}