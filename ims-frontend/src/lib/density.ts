import type { Density } from "../context/AssessmentContext";

interface DensityScale {
  questionGap: string;
  fieldGap: string;
  rowPadding: string;
  sectionGap: string;
  optionPadding: string;
}

const scales: Record<Density, DensityScale> = {
  compact: {
    questionGap: "gap-4",
    fieldGap: "gap-2",
    rowPadding: "py-2",
    sectionGap: "space-y-6",
    optionPadding: "py-2 px-3",
  },
  comfortable: {
    questionGap: "gap-6",
    fieldGap: "gap-3",
    rowPadding: "py-3",
    sectionGap: "space-y-10",
    optionPadding: "py-3 px-4",
  },
  spacious: {
    questionGap: "gap-8",
    fieldGap: "gap-4",
    rowPadding: "py-4",
    sectionGap: "space-y-14",
    optionPadding: "py-4 px-5",
  },
};

export function getDensityScale(density: Density): DensityScale {
  return scales[density];
}
