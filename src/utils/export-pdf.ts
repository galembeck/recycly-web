import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Collect } from "@/types/collect";
import type { Sale } from "@/types/sale";

const GREEN: [number, number, number] = [45, 122, 45];
const PAGE_WIDTH = 210; // A4 mm

function addHeader(doc: jsPDF, title: string) {
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, PAGE_WIDTH, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Recycly", 14, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(title, PAGE_WIDTH / 2, 13, { align: "center" });

  doc.setFontSize(8);
  doc.text(
    `Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
    PAGE_WIDTH - 14,
    13,
    { align: "right" },
  );

  doc.setTextColor(0, 0, 0);
}

export function exportCollectHistoryPDF(collects: Collect[]) {
  const doc = new jsPDF({ orientation: "landscape" });

  addHeader(doc, "Relatório de Coletas");

  const totalWeight = collects.reduce((s, c) => s + Number(c.weightKg), 0);

  autoTable(doc, {
    startY: 26,
    head: [["ID", "Ponto de coleta", "Data", "Material", "Peso (kg)", "Observações"]],
    body: collects.map((c) => [
      c.id.slice(0, 8) + "...",
      c.collectionPointName ?? "—",
      format(new Date(c.collectedAt), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      c.material?.name ?? "—",
      `${Number(c.weightKg).toFixed(3)} kg`,
      c.notes ?? "—",
    ]),
    foot: [["", "", "", "Total", `${totalWeight.toFixed(3)} kg`, ""]],
    styles: { fontSize: 8 },
    headStyles: { fillColor: GREEN },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 252, 248] },
  });

  doc.save(`coletas-${format(new Date(), "yyyy-MM-dd")}.pdf`);
}

export function exportSalesPDF(sales: Sale[]) {
  const doc = new jsPDF({ orientation: "landscape" });

  addHeader(doc, "Relatório de Vendas");

  const totalWeight = sales.reduce((s, v) => s + Number(v.weightKg), 0);
  const totalRevenue = sales.reduce((s, v) => s + Number(v.price), 0);
  const formatBRL = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

  autoTable(doc, {
    startY: 26,
    head: [["ID", "Comprador", "Materiais", "Peso (kg)", "Valor", "Data", "Observações"]],
    body: sales.map((s) => [
      s.id.slice(0, 8) + "...",
      s.buyerName,
      s.materials.map((m) => m.name).join(", ") || "—",
      `${Number(s.weightKg).toFixed(3)} kg`,
      formatBRL(s.price),
      format(new Date(s.soldAt), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      s.notes ?? "—",
    ]),
    foot: [["", "", "Total", `${totalWeight.toFixed(3)} kg`, formatBRL(totalRevenue), "", ""]],
    styles: { fontSize: 8 },
    headStyles: { fillColor: GREEN },
    footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 252, 248] },
  });

  doc.save(`vendas-${format(new Date(), "yyyy-MM-dd")}.pdf`);
}
