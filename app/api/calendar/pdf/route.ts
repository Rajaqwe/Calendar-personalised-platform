import { NextRequest } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { Resvg } from '@resvg/resvg-js'
import { calendarPageSvg, getTemplateConfig } from '@/lib/calendar/engine'

export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
  try {
    const { templateId='01', imageHref, year=2027 } = await request.json()
    const config = getTemplateConfig(String(templateId))
    const pdf = await PDFDocument.create()
    for (let i=0;i<12;i++) {
      const svg = calendarPageSvg(config, i, typeof imageHref==='string'?imageHref:undefined, Number(year))
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1240 } }).render().asPng()
      const image = await pdf.embedPng(png)
      const page = pdf.addPage([595.28,841.89])
      page.drawImage(image,{x:0,y:0,width:595.28,height:841.89})
    }
    const bytes = await pdf.save()
    return new Response(bytes,{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="personalized-calendar.pdf"','Cache-Control':'no-store'}})
  } catch (error) { console.error(error); return Response.json({error:'PDF generation failed'},{status:500}) }
}
