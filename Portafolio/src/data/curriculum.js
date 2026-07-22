const IDS = {
  educacion: ["kinal"],
  habilidadesBlandas: [
    "team",
    "communication",
    "problem",
    "adaptability",
    "proactivity",
    "critical",
    "time",
    "service",
    "growth",
    "responsibility",
  ],
  experienciaDesarrollo: ["ecoapp", "ahorcado"],
  experienciaLaboral: ["brooks", "tecun"],
};

const GITHUB_URLS = {
  ecoapp: "https://github.com/aalvarez-2024004/EcoApp/tree/ftalacan-2024010",
  ahorcado: "https://github.com/aalvarez-2024004/ProyectoFinal4toBim.git",
};

export function generarCurriculum(t) {
  return {
    educacion: IDS.educacion.map((id) => ({
      institucion: t(`curriculum.educacion.${id}.institucion`),
      titulo: t(`curriculum.educacion.${id}.titulo`),
      periodo: t(`curriculum.educacion.${id}.periodo`),
      enfoque: t(`curriculum.educacion.${id}.enfoque`, { returnObjects: true }),
    })),

    habilidadesBlandas: IDS.habilidadesBlandas.map((id) => ({
      label: t(`curriculum.habilidadesBlandas.${id}`),
      icon: id,
    })),

    experienciaDesarrollo: IDS.experienciaDesarrollo.map((id) => ({
      nombre: t(`curriculum.experienciaDesarrollo.${id}.nombre`),
      descripcion: t(`curriculum.experienciaDesarrollo.${id}.descripcion`),
      stack: t(`curriculum.experienciaDesarrollo.${id}.stack`, { returnObjects: true }),
      github: GITHUB_URLS[id],
    })),

    experienciaLaboral: IDS.experienciaLaboral.map((id) => ({
      empresa: t(`curriculum.experienciaLaboral.${id}.empresa`),
      puesto: t(`curriculum.experienciaLaboral.${id}.puesto`),
      periodo: t(`curriculum.experienciaLaboral.${id}.periodo`),
      bullets: t(`curriculum.experienciaLaboral.${id}.bullets`, { returnObjects: true }),
    })),
  };
}

export default generarCurriculum;