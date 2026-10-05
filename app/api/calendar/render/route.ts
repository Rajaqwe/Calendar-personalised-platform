import { NextRequest, NextResponse } from 'next/server'
import { calendarPageSvg, getTemplateConfig } from '@/lib/calendar/engine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const templateId = String(body.templateId || '01')
    const imageHref = typeof body.imageHref === 'string' ? body.imageHref : undefined
    const year = Number(body.year) || new Date().getFullYear()
    const config = getTemplateConfig(templateId)
    const pages = Array.from({ length: 12 }, (_, monthIndex) => ({ monthIndex, month: monthIndex + 1, svg: calendarPageSvg(config, monthIndex, imageHref, year) }))
    return NextResponse.json({ template: config, year, pages })
  } catch { return NextResponse.json({ error: 'Unable to render calendar' }, { status: 400 }) }
}
