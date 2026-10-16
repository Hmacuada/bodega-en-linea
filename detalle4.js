// DETALLE 4 – Herramientas y equipos, Formularios y registros
window.DET = window.DET || {};
Object.assign(window.DET, {
  "grua-horquilla": {
    objetivo: "Operar la grúa horquilla de forma segura para proteger a las personas, la carga y la infraestructura.",
    alcance: "Operadores autorizados, supervisores y personal que circula cerca del equipo.",
    pasos: [
      ["Verificar autorización", "Solo opera el personal capacitado y autorizado."],
      ["Completar el check list", "Frenos, luces, alarma de retroceso, ruedas, horquillas, mástil, fugas, cinturón y extintor."],
      ["Respetar la capacidad", "Nunca exceda la capacidad nominal indicada en la placa y no transporte personas."],
      ["Circular con la carga baja", "Horquillas a baja altura, mirando en el sentido de la marcha y con visibilidad despejada."],
      ["Respetar señalización y velocidades", "Ceda el paso a peatones y cruce con precaución."],
      ["Estacionar correctamente", "Horquillas abajo, freno de estacionamiento y llave retirada."]
    ],
    ejemplo: "Al iniciar el turno, el operador completa el check list: detecta una fuga de aceite hidráulico. Rotula el equipo «Fuera de servicio» y avisa al supervisor; el trabajo se realiza con la transpaleta mientras se repara.",
    controles: ["Operador con autorización vigente.", "Check list diario firmado.", "Alarma y luces operativas.", "Sin personas en el radio de maniobra."],
    errores: ["Circular con la carga elevada.", "Cargar sobre la capacidad.", "Usar el equipo con fallas «para terminar el turno»."]
  },
  "transpaleta": {
    objetivo: "Mover carga paletizada con una transpaleta manual de forma segura y eficiente.",
    alcance: "Personal de bodega que opere transpaletas.",
    ejemplo: "Para mover un pallet de 600 kg, el bodeguero revisa que las ruedas giren, introduce las horquillas completamente, eleva lo mínimo y camina empujando por el pasillo demarcado. Al llegar, desciende la carga y deja la transpaleta en su lugar.",
    controles: ["Ruedas y palanca en buen estado.", "Carga dentro de la capacidad de placa.", "Equipo guardado en su lugar."],
    errores: ["Tirar la transpaleta en vez de empujarla.", "Usarla en pendientes.", "Dejarla en pasillos."]
  },
  "checklist-equipos": {
    objetivo: "Detectar fallas de los equipos antes de operarlos para prevenir accidentes y detenciones.",
    alcance: "Grúas horquilla y otros equipos de movimiento de carga.",
    ejemplo: "Un check list marca «No conforme» en frenos. El operador no usa el equipo; el supervisor lo deriva a mantenimiento y queda registrado para análisis.",
    controles: ["El check list está firmado cada turno.", "Las fallas críticas detienen el equipo.", "El registro se archiva."],
    errores: ["Marcar todo «conforme» sin revisar.", "No informar fallas menores que se agravan.", "Archivar sin firma."]
  },
  "eslingas-izaje": {
    objetivo: "Izar cargas con elementos adecuados, inspeccionados y en buen estado.",
    alcance: "Personal que use eslingas, cadenas, grilletes y puentes grúa.",
    ejemplo: "Antes de izar un motor, el operador revisa la etiqueta de la eslinga: soporta 2 t y el motor pesa 1,4 t. Inspecciona cortes y desgaste, protege los bordes y mantiene a todos fuera del área.",
    controles: ["Capacidad mayor que el peso de la carga.", "Inspección previa de cada elemento.", "Zona bajo la carga despejada."],
    errores: ["Usar eslingas con cortes o nudos.", "Exceder la capacidad.", "Permanecer bajo la carga suspendida."]
  },
  "equipos-captura": {
    objetivo: "Medir, leer e imprimir datos con precisión mediante equipos en buen estado.",
    alcance: "Pesas, huinchas, pies de metro, lectores de código, PDA e impresoras de etiquetas.",
    ejemplo: "Antes de pesar un lote, el bodeguero pone la pesa a cero y comprueba su lectura con una pesa patrón. Luego imprime las etiquetas y prueba la lectura con el lector antes de pegarlas.",
    controles: ["Calibración vigente de pesas.", "Baterías cargadas.", "Etiquetas legibles al escanear."],
    errores: ["Usar pesas descalibradas.", "No cargar los equipos al terminar el turno.", "Imprimir etiquetas sin probar."]
  },
  "mantenimiento-equipos": {
    objetivo: "Mantener los equipos en condiciones seguras y retirar de servicio los que fallen.",
    alcance: "Equipos de la bodega y su personal usuario.",
    ejemplo: "Una transpaleta presenta una rueda trabada. Se rotula «Fuera de servicio», se retira de la zona y se avisa a mantenimiento; al volver, queda registrado el retorno al servicio.",
    controles: ["Equipos rotulados cuando fallan.", "Registro de fallas y reparaciones.", "Mantención programada al día."],
    errores: ["Reparar sin autorización.", "Dejar equipos averiados en el pasillo.", "No registrar el retorno al servicio."]
  },
  "formatos": {
    objetivo: "Dar a conocer los documentos del manual y en qué procedimiento se usa cada uno.",
    alcance: "Todo el personal que complete registros.",
    ejemplo: "Para registrar una diferencia con el proveedor, el bodeguero usa el «Acta de discrepancia»; para una salida, el «Vale de salida»; para la revisión diaria de la grúa, el «Check list de equipo». Todos están disponibles en Formularios y registros.",
    controles: ["Se usa siempre la última versión.", "Los formatos se llenan completos.", "Se archivan ordenados."]
  },
  "llenado-registros": {
    objetivo: "Asegurar que los registros sean claros, completos y confiables como evidencia.",
    alcance: "Todos los formatos físicos y digitales.",
    ejemplo: "Al completar el vale de salida, el bodeguero escribe con letra legible, anota la fecha, hace firmar al solicitante y corrige un error tachando con una línea y firmando al lado.",
    controles: ["Campos completos y legibles.", "Fecha, nombre y firma.", "Archivo ordenado por fecha y tipo."],
    errores: ["Usar corrector.", "Dejar campos en blanco.", "Archivar sin firma."]
  }
});
