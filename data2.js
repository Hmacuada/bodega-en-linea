// COMPLEMENTO 2 – Completa todas las secciones del manual.
// origen "manual": sale del Word "Manual de bodega e inventario 2026" (puntos 16 y 17 que faltaban).
// origen "complemento": no está en el manual; se redactó con buenas prácticas y normativa chilena vigente (verificar en leychile.cl).
(function () {
  const M = window.MANUAL;
  const L = (t, lista) => ({ t, lista });
  const T = (t, cols, rows) => ({ t, tabla: { cols, rows } });
  const F = "2026-10-10";
  const add = p => M.procedimientos.push(Object.assign({ origen: "complemento", fecha: F, parrafos: [], pasos: [], tips: [], bloques: [] }, p));
  const ok = texto => ({ tipo: "ok", texto }), info = texto => ({ tipo: "info", texto });

  // ---------- 1 GENERALIDADES ----------
  add({ id: "zonas-bodega", seccion: "generalidades", titulo: "Zonas de la bodega y señalización", resumen: "Qué función cumple cada zona y qué procedimiento le corresponde.",
    parrafos: ["La bodega se divide en zonas con una función definida para evitar mezclar material conforme, material por validar y material rechazado. Cada zona debe estar demarcada, señalizada y registrada en el ERP cuando corresponda."],
    bloques: [T("Zonas", ["Zona", "Función", "Procedimiento"], M.zonas.map(z => [z.nombre, z.desc, `<a href="#/proc/${z.proc}" style="color:var(--blue)">Ver procedimiento →</a>`])),
      L("Reglas generales", ["Pasillos y salidas siempre despejados.", "Material no conforme solo en cuarentena o identificación pendiente.", "Sustancias peligrosas solo en el área especial autorizada.", "Toda ubicación nueva se registra en el ERP antes de usarse."])],
    tips: [info("Los códigos de zona (R01, R02, G01, Q01, P01) son referenciales: ajústelos al layout real de la bodega.")] });
  add({ id: "conclusion", seccion: "generalidades", origen: "manual", fecha: "2026-10-08", titulo: "Conclusión", resumen: "Síntesis del manual y su aporte a la continuidad operacional.",
    parrafos: ["El manual establece un procedimiento ordenado y estandarizado para administrar la bodega e inventario de una empresa minera. A través de sus etapas asegura que materiales, repuestos, herramientas, EPP e insumos sean correctamente recibidos, identificados, registrados, homologados, clasificados y controlados.",
      "Su aplicación disminuye errores de inventario, evita duplicidades de códigos, mantiene la trazabilidad y reduce el riesgo de entregar repuestos incorrectos. El uso de documentación, sistemas ERP y registros de incidencias facilita el seguimiento de cada material desde su recepción hasta su uso.",
      "Un aspecto fundamental es la identificación de fallas y sus acciones correctivas: ante documentación incompleta, diferencias de cantidad, materiales dañados, códigos incorrectos o repuestos incompatibles, se separa el material, se registra la incidencia, se informa a los responsables y se regulariza antes de ponerlo a disposición.",
      "Finalmente, los indicadores de control permiten evaluar el cumplimiento y detectar oportunidades de mejora para mantener un inventario confiable y apoyar la continuidad operacional."] });

  // ---------- 2 ALMACENAMIENTO ----------
  add({ id: "rotacion-fifo-fefo", seccion: "almacenamiento", titulo: "Rotación de existencias: FIFO y FEFO", resumen: "Cómo evitar materiales vencidos u obsoletos.", zona: ["R01", "R02", "Q01"],
    parrafos: ["La rotación define qué material sale primero. FIFO (primero en entrar, primero en salir) se usa por defecto. FEFO (primero en vencer, primero en salir) se usa cuando el material tiene fecha de vencimiento: químicos, lubricantes, algunos EPP y reactivos."],
    pasos: ["Registrar fecha de ingreso y, si existe, fecha de vencimiento y lote en el ERP.", "Ubicar el lote más antiguo (o que vence antes) al frente o en el nivel de más fácil acceso.", "En el despacho, retirar siempre el lote indicado por el ERP.", "Revisar mensualmente los materiales próximos a vencer y avisar a Abastecimiento y al usuario.", "Mover el material vencido a cuarentena, identificarlo como «Vencido» y gestionar su baja."],
    tips: [ok("No mezcle lotes distintos en un mismo bulto o posición.")] });
  add({ id: "almacenaje-tipo", seccion: "almacenamiento", titulo: "Almacenamiento según tipo de material", resumen: "Criterios de almacenamiento por familia de material.", zona: ["R01", "R02", "G01", "Q01"],
    parrafos: ["Complemento de buenas prácticas. Siempre priorice las instrucciones del fabricante y la HDS del producto."],
    bloques: [T("Criterios por tipo", ["Tipo de material", "Criterio"], [
      ["Repuestos pesados", "Nivel bajo del rack o piso demarcado; mover con ayuda mecánica."],
      ["Piezas pequeñas", "Gavetas rotuladas con código y descripción."],
      ["Lubricantes y fluidos", "Envases cerrados y rotulados, sobre bandeja de contención, lejos de fuentes de calor."],
      ["Sustancias químicas", "Área especial autorizada, HDS disponible y segregación de incompatibles (DS 43/2015)."],
      ["EPP", "Lugar seco y limpio, protegido de luz solar y humedad; controlar vencimiento."],
      ["Material eléctrico", "Lugar seco; cables en carretes o rollos identificados."],
      ["Mangueras y componentes hidráulicos", "Extremos tapados para evitar contaminación; sin dobleces."],
      ["Material dañado o por validar", "Zona de cuarentena o identificación pendiente, rotulado."]])] });

  // ---------- 3 RECEPCIÓN ----------
  add({ id: "recepcion-peligrosos", seccion: "recepcion", titulo: "Recepción de sustancias peligrosas", resumen: "Controles adicionales al recibir químicos y productos peligrosos.", zona: ["P01", "Q01"],
    parrafos: ["Las sustancias peligrosas requieren verificación adicional antes de ingresar. El almacenamiento de estas sustancias se rige por el DS 43/2015 del MINSAL (clasificación NCh 382) y exige autorización sanitaria de la bodega."],
    pasos: ["Confirmar con Prevención de Riesgos que el área y los EPP específicos están disponibles antes de descargar.", "Exigir la HDS (hoja de datos de seguridad) vigente junto al producto.", "Revisar envases: sin fugas, tapas firmes, etiquetas y pictogramas de peligro legibles.", "Descargar sin arrastrar ni golpear los envases, con el equipo adecuado.", "Trasladar directamente al área especial autorizada, segregando incompatibles.", "Registrar cantidad, lote, vencimiento y clase de peligro en el ERP.", "Ante un derrame, aplicar el plan de contingencia, usar el kit antiderrames y avisar a Prevención."],
    bloques: [L("Documentación", ["Orden de compra y guía de despacho", "HDS vigente", "Registro de recepción", "Registro de incidencias (si hay derrame o daño)"])],
    tips: [info("Los explosivos están fuera del DS 43 y se rigen por su propia normativa; no se almacenan en esta bodega.")] });

  // ---------- 4 DESPACHO ----------
  add({ id: "vale-salida", seccion: "despacho", titulo: "Solicitud y autorización de materiales", resumen: "Quién puede pedir materiales y cómo se autoriza una salida.", zona: ["MESA"],
    parrafos: ["Ningún material sale de la bodega sin una solicitud autorizada y un vale de salida registrado."],
    pasos: ["El solicitante completa el vale de salida con código, descripción, cantidad, área o centro de costo y equipo u orden de trabajo.", "El supervisor o jefe del área autoriza con firma o aprobación en el sistema.", "El bodeguero valida que el solicitante esté en la lista de autorizados.", "En urgencias fuera de horario, la salida se regulariza con el vale al día hábil siguiente.", "El bodeguero entrega y el solicitante firma de recepción conforme."],
    bloques: [L("Documentación", ["Vale de salida / solicitud de materiales", "Orden interna u orden de trabajo", "Registro de autorizados"]), T("Quién interviene", ["Rol", "Función"], [["Solicitante", "Pide el material y firma la recepción."], ["Supervisor del área", "Autoriza la solicitud."], ["Bodeguero", "Prepara, entrega y registra la salida."], ["Jefe de bodega", "Resuelve excepciones y urgencias."]])],
    tips: [info("Use el formato «Vale de salida» disponible en Formularios y registros.")] });
  add({ id: "registrar-derivar", seccion: "despacho", origen: "manual", fecha: "2026-10-08", titulo: "Registrar y derivar", resumen: "Registro formal de movimientos y derivación al área correspondiente.", zona: ["MESA"],
    parrafos: ["El registro es el ingreso formal de los datos de la mercancía al sistema de la empresa (generalmente un software). Su objetivo es la trazabilidad."],
    pasos: ["Registrar correctamente el ingreso o salida de los materiales en el sistema.", "Verificar que la información registrada coincida con la documentación.", "Actualizar las existencias del inventario.", "Identificar y etiquetar los materiales.", "Derivar los materiales al área correspondiente.", "Registrar los movimientos internos de materiales.", "Informar diferencias, materiales faltantes o errores detectados.", "Mantener la documentación ordenada y disponible para su control."],
    bloques: [L("Encargados", ["Bodeguero", "Analista", "Administrativo de bodega"]), L("Documentación", ["Orden de compra", "Guía de despacho", "Factura", "Registro de ingreso o recepción de mercadería", "Vale de salida o solicitud de materiales", "Registro de inventario", "Documento de derivación o traslado interno"]), L("Recursos materiales", ["Computador", "Sistema ERP o software de inventario", "Lector de código de barras", "Etiquetas y códigos de identificación", "Impresora", "Formularios de registro", "Transpaleta o carro para traslado"])] });
  add({ id: "devoluciones", seccion: "despacho", titulo: "Devolución de materiales", resumen: "Devoluciones de usuarios a bodega y de bodega al proveedor.", zona: ["P01", "CUAR"],
    parrafos: ["Existen dos tipos de devolución: del usuario a la bodega (material sobrante o no utilizado) y de la bodega al proveedor (material no conforme)."],
    pasos: ["Usuario a bodega: revisar que el material esté sin uso, completo y con su embalaje.", "Verificar código y estado; si está conforme, reingresar al stock y a su ubicación.", "Si hay duda de estado o no coincide, enviar a identificación pendiente hasta validar.", "Bodega a proveedor: mantener el material en cuarentena con el acta de discrepancia.", "Coordinar con Compras la guía de devolución y la nota de crédito o reposición.", "Registrar la salida en el ERP y archivar los respaldos."],
    tips: [ok("Toda devolución debe quedar respaldada en un documento firmado.")] });
  add({ id: "despacho-peligrosos-epp", seccion: "despacho", titulo: "Despacho de EPP y sustancias peligrosas", resumen: "Controles especiales al entregar EPP y químicos.", zona: ["MESA", "Q01"],
    parrafos: ["Estos materiales requieren registro adicional y entrega con información de seguridad."],
    pasos: ["EPP: verificar talla, vigencia y certificación, y registrar la entrega con firma del trabajador.", "Capacitar o recordar el uso correcto al entregar un EPP nuevo.", "Sustancias químicas: entregar solo en envase original o debidamente rotulado.", "Adjuntar o indicar dónde consultar la HDS del producto.", "Cuidar la compatibilidad al preparar el transporte interno.", "Registrar la salida con lote y cantidad en el ERP."],
    tips: [info("El empleador debe entregar los EPP sin costo para el trabajador y adecuados al riesgo (DS 594).")] });

  // ---------- 5 INVENTARIO ----------
  add({ id: "ajustes-bajas", seccion: "inventario", titulo: "Ajustes de inventario y baja de materiales", resumen: "Cómo corregir diferencias y dar de baja material dañado o vencido.", zona: ["CUAR"],
    parrafos: ["Los ajustes solo se realizan después de investigar la causa de la diferencia y con autorización. Nunca se «cuadra» el sistema sin respaldo."],
    pasos: ["Recontar la ubicación con un segundo contador.", "Revisar movimientos pendientes (guías, vales, traslados) que expliquen la diferencia.", "Clasificar la causa: error de registro, faltante, sobrante, daño, vencimiento u obsolescencia.", "Solicitar autorización del jefe de bodega y, si la política de la empresa lo exige, de Finanzas o Contabilidad.", "Registrar el ajuste en el ERP con su motivo y documento de respaldo.", "Para bajas: levantar un acta de baja con evidencia fotográfica y definir la disposición final.", "Los residuos peligrosos se entregan a una empresa autorizada, según el DS 148 del MINSAL."],
    tips: [info("Un ajuste sin causa identificada debe quedar como incidencia abierta.")] });
  add({ id: "trazabilidad-critica", seccion: "inventario", titulo: "Trazabilidad de materiales críticos", resumen: "Control de repuestos y componentes con serie, lote o vencimiento.", zona: ["R01", "R02"],
    parrafos: ["Son críticos los materiales cuya falla detiene un equipo o afecta la seguridad, y los que tienen número de serie, lote o vida útil. El manual exige mantener su trazabilidad completa."],
    pasos: ["Identificar los ítems críticos en el ERP con una marca o familia específica.", "Registrar N° de serie, lote, fecha de vencimiento y equipo asociado al ingreso.", "Registrar cada movimiento (ubicación, salida, devolución) con fecha y responsable.", "Al despachar, entregar solo el material validado contra el N° de parte.", "Si se detecta un problema de calidad, bloquear el lote en el ERP y avisar a Mantenimiento.", "Revisar periódicamente la vigencia y el estado de los materiales con vida útil."],
    bloques: [T("Datos mínimos de trazabilidad", ["Dato", "Para qué sirve"], [["N° de serie", "Identifica un componente individual."], ["Lote", "Permite ubicar todo un grupo de fabricación."], ["Fecha de vencimiento", "Evita usar material vencido."], ["Equipo asociado", "Confirma compatibilidad."], ["Historial de movimientos", "Permite reconstruir dónde estuvo el material."]])] });
  add({ id: "reposicion-stock", seccion: "inventario", titulo: "Reposición y stock de seguridad", resumen: "Fórmulas para saber cuándo y cuánto reponer.",
    parrafos: ["Complemento con fórmulas habituales de gestión de inventarios. Los valores de consumo y plazo de entrega deben salir del ERP."],
    bloques: [T("Fórmulas", ["Indicador", "Fórmula"], [["Punto de reorden", "(Consumo diario × plazo de entrega en días) + stock de seguridad"], ["Cobertura (días)", "Stock disponible ÷ consumo diario"], ["Rotación", "Consumo anual ÷ stock promedio"], ["Exactitud de registros (IRA)", "Ubicaciones sin diferencia ÷ total de ubicaciones contadas × 100"]]),
      L("Buenas prácticas", ["Definir un stock de seguridad mayor para repuestos críticos.", "Revisar el punto de reorden al menos una vez al año.", "Dar aviso a Abastecimiento cuando un ítem llegue a su punto de reorden.", "Revisar los ítems sin movimiento para evaluar su obsolescencia."])] });

  // ---------- 6 SEGURIDAD ----------
  add({ id: "manejo-cargas", seccion: "seguridad", titulo: "Manejo manual de cargas", resumen: "Límites legales y técnicas de levantamiento.",
    parrafos: ["La Ley 20.949 («Ley del Saco») y el DS 63/2005 limitan el peso que se puede mover manualmente. El empleador debe priorizar ayudas mecánicas y aplicar medidas de mitigación."],
    bloques: [T("Límites legales", ["Trabajador", "Máximo sin ayuda mecánica"], [["Hombre adulto", "25 kg (solo si el uso de ayudas mecánicas no es posible)"], ["Mujeres y menores de 18 años", "20 kg"]])],
    pasos: ["Evaluar el peso, tamaño y agarre antes de levantar.", "Usar transpaleta, grúa o carro cuando el peso supere el límite.", "Separar los pies, flectar las rodillas y mantener la espalda recta.", "Acercar la carga al cuerpo y no girar el tronco al moverla.", "Pedir ayuda y coordinar el levantamiento entre dos o más personas.", "Rotar al personal en tareas repetitivas de levantamiento."],
    tips: [info("La Inspección del Trabajo fiscaliza esta norma; las multas van desde 9 a 60 UTM.")] });
  add({ id: "sustancias-peligrosas", seccion: "seguridad", titulo: "Manejo de sustancias peligrosas", resumen: "Clasificación, HDS, rotulado, incompatibilidades y derrames.", zona: ["Q01"],
    parrafos: ["El almacenamiento de sustancias peligrosas se rige por el DS 43/2015 del MINSAL, que clasifica según NCh 382. La HDS (NCh 2245) es el documento base para su manejo."],
    pasos: ["Verificar que cada producto tenga su HDS vigente y esté disponible en bodega.", "Mantener los envases originales cerrados y con etiqueta legible.", "Segregar sustancias incompatibles (por ejemplo, inflamables lejos de oxidantes).", "Usar los EPP indicados en la HDS.", "Contar con kit antiderrames, ducha o lavaojos y extintores señalizados.", "Ante un derrame: avisar, delimitar el área, aplicar el procedimiento de contención y registrar el incidente."],
    bloques: [L("Clases según NCh 382", ["Gases", "Líquidos inflamables", "Sólidos inflamables", "Comburentes", "Tóxicos", "Corrosivos", "Sustancias peligrosas varias"])],
    tips: [info("La bodega que almacena estas sustancias requiere autorización de la SEREMI de Salud. Verifique el texto vigente en leychile.cl.")] });
  add({ id: "orden-aseo", seccion: "seguridad", titulo: "Orden, aseo y circulación segura", resumen: "Prácticas 5S, señalización y tránsito de equipos y personas.", zona: ["P01"],
    parrafos: ["El orden es parte de la seguridad: la mayoría de los incidentes en bodega se relacionan con pasillos obstruidos, carga mal apilada o circulación sin control."],
    pasos: ["Clasificar: retirar lo que no se usa y separar lo defectuoso.", "Ordenar: cada cosa en su ubicación señalizada.", "Limpiar: derrames y residuos de inmediato.", "Estandarizar: mantener la demarcación de pasillos, zonas y salidas.", "Disciplina: revisar el orden al inicio y término de cada turno.", "Separar la circulación peatonal de la de equipos y respetar la señalización y las velocidades internas."],
    tips: [ok("Pasillos y salidas de emergencia deben estar siempre despejados.")] });
  add({ id: "emergencias", seccion: "seguridad", titulo: "Emergencias, incendio y evacuación", resumen: "Cómo actuar ante incendio, derrame o lesión.", zona: ["P01"],
    parrafos: ["Todo trabajador debe conocer las vías de evacuación, el punto de encuentro y la ubicación de extintores y primeros auxilios. El DS 594 exige extintores señalizados y con mantención."],
    pasos: ["Mantener la calma y dar la alarma al supervisor y a la central de emergencia.", "Si es seguro y está capacitado, usar el extintor adecuado al tipo de fuego.", "Cortar la energía de equipos cercanos cuando sea posible.", "Evacuar por la vía señalizada, sin usar ascensores ni retroceder por objetos personales.", "Reunirse en el punto de encuentro y esperar el conteo de personal.", "No volver a ingresar hasta que lo autorice el responsable de la emergencia."],
    bloques: [L("Ubicaciones que debe conocer", ["Extintores", "Salidas y vías de evacuación", "Punto de encuentro", "Botiquín y lavaojos", "Teléfonos de emergencia"])],
    tips: [info("Participe en los simulacros programados por Prevención de Riesgos.")] });
  add({ id: "reporte-incidentes", seccion: "seguridad", titulo: "Reporte de incidentes y accidentes", resumen: "Cómo informar un cuasi accidente, incidente o accidente.",
    parrafos: ["Todo hecho, incluso sin lesiones (cuasi accidente), debe reportarse. Los accidentes del trabajo están regulados por la Ley 16.744; la denuncia a la mutualidad y las notificaciones a los organismos competentes las gestiona la empresa."],
    pasos: ["Atender al lesionado y asegurar el área si no hay riesgo adicional.", "Avisar de inmediato al supervisor y a Prevención de Riesgos.", "Registrar el hecho: fecha, hora, lugar, personas, equipo y descripción.", "Tomar evidencia fotográfica si es seguro.", "Colaborar en la investigación y en las acciones correctivas.", "Cerrar el caso en el registro de incidencias una vez implementadas las medidas."],
    tips: [info("Accidentes graves o fatales requieren notificación inmediata a los organismos competentes (Inspección del Trabajo, SEREMI de Salud y Sernageomin en faenas mineras).")] });

  // ---------- 7 HERRAMIENTAS ----------
  const tp = M.procedimientos.find(p => p.id === "transpaleta");
  Object.assign(tp, { titulo: "Uso seguro de transpaleta", resumen: "Operación e inspección de la transpaleta manual.", pasos: ["Inspeccionar ruedas, horquillas y palanca antes de usarla.", "Introducir las horquillas completamente bajo el pallet.", "Elevar lo mínimo necesario y mover en superficies planas.", "No exceder la capacidad indicada en la placa.", "Descender la carga con control y retirar la transpaleta.", "Dejarla en su lugar asignado, con las horquillas abajo."] });
  add({ id: "checklist-equipos", seccion: "herramientas", titulo: "Inspección previa de equipos (check list)", resumen: "Revisión antes de operar grúa horquilla u otro equipo.", zona: ["P01"],
    parrafos: ["El manual exige equipos con mantención al día y check list de equipos. La revisión se hace al inicio de cada turno."],
    pasos: ["Verificar que el operador tenga autorización vigente.", "Completar el check list del equipo (frenos, luces, alarma de retroceso, ruedas, horquillas, mástil, fugas, cinturón, extintor).", "Probar los controles sin carga.", "Si hay una falla crítica, no operar y rotular «Fuera de servicio».", "Entregar el check list firmado al supervisor."],
    tips: [ok("Use el formato «Check list de equipo» disponible en Formularios y registros.")] });
  add({ id: "eslingas-izaje", seccion: "herramientas", titulo: "Eslingas y elementos de izaje", resumen: "Inspección y uso seguro de eslingas, cadenas y grilletes.",
    parrafos: ["Las eslingas se usan con la grúa horquilla o puentes grúa para cargas que no se pueden mover sobre pallet."],
    pasos: ["Verificar la capacidad indicada en la etiqueta y que sea mayor que el peso de la carga.", "Inspeccionar cortes, desgaste, deformaciones y costuras dañadas; descartar si hay dudas.", "Colocar la eslinga sin nudos ni torceduras y proteger los bordes filosos.", "Mantener a las personas fuera de la zona bajo la carga.", "Izar lo mínimo necesario y mover con control.", "Guardar las eslingas limpias, secas y colgadas."],
    tips: [info("Respete las instrucciones del fabricante y los procedimientos de izaje de su faena.")] });
  add({ id: "equipos-captura", seccion: "herramientas", titulo: "Pesa, huincha, lector de códigos e impresora", resumen: "Uso y cuidado de los equipos de medición y captura de datos.", zona: ["MESA"],
    parrafos: ["Son los equipos con los que se verifica y registra el material: pesa, huincha o pie de metro, lector de códigos o PDA e impresora de etiquetas."],
    pasos: ["Verificar que la pesa tenga calibración vigente y poner a cero antes de pesar.", "Medir con huincha o pie de metro sobre superficie plana.", "Cargar la batería del lector y de la impresora al final del turno.", "Probar la lectura de las etiquetas impresas antes de pegarlas.", "Reportar cualquier falla al supervisor y usar el equipo de respaldo."] });
  add({ id: "mantenimiento-equipos", seccion: "herramientas", titulo: "Mantenimiento básico y equipos fuera de servicio", resumen: "Rutinas simples y qué hacer cuando un equipo falla.",
    parrafos: ["El mantenimiento correctivo y preventivo mayor lo realiza personal autorizado. En bodega se realizan rutinas básicas de cuidado."],
    pasos: ["Limpiar y revisar los equipos al final del turno.", "Revisar niveles y estado de batería según el tipo de equipo.", "Reportar ruidos, fugas o comportamientos anormales.", "Rotular «Fuera de servicio» el equipo con falla y retirarlo de la zona de trabajo.", "No reparar ni modificar equipos sin autorización.", "Registrar la falla y el retorno al servicio."],
    bloques: [L("Frecuencias sugeridas", ["Cada turno: inspección previa (check list).", "Semanal: revisión de ruedas, horquillas y baterías.", "Según pauta del fabricante: mantención programada."])] });

  // ---------- 8 FORMULARIOS ----------
  add({ id: "llenado-registros", seccion: "formularios", titulo: "Buenas prácticas de llenado y archivo", resumen: "Cómo completar, firmar y conservar los registros.",
    parrafos: ["Un registro mal llenado pierde su valor como evidencia. Todo formato debe ser claro, completo y trazable."],
    pasos: ["Usar siempre la última versión del formato.", "Completar todos los campos con letra legible o digitalmente; no dejar espacios sin llenar.", "Anotar la fecha, el nombre y la firma del responsable.", "Corregir tachando con una línea y firmando; no usar corrector.", "Archivar los documentos de respaldo ordenados por fecha y tipo.", "Conservar los documentos tributarios (facturas, guías) por el plazo que exija la ley y la política de la empresa (consulte a Contabilidad)."] });

  // ---------- ORDEN (prev/next siguen el orden del menú) ----------
  const ORDER = ["objetivo-manual", "roles", "zonas-bodega", "glosario", "conclusion",
    "ubicacion", "almacenamiento-seguro", "almacenaje-tipo", "rotacion-fifo-fefo", "codificar-etiquetar", "identificar", "fallas-identificacion", "tipo-uso", "atributos-control", "etiquetar",
    "preparacion-recepcion", "recepcion-documentos", "descarga", "recepcion-peligrosos", "verificacion", "registro-ingreso", "discrepancias",
    "despacho-pedidos", "vale-salida", "despacho-peligrosos-epp", "registrar-derivar", "devoluciones",
    "control-inventario", "ajustes-bajas", "trazabilidad-critica", "reposicion-stock", "homologar", "fallas-homologacion", "indicadores",
    "uso-epp", "manejo-cargas", "sustancias-peligrosas", "orden-aseo", "emergencias", "reporte-incidentes", "normativa",
    "grua-horquilla", "transpaleta", "checklist-equipos", "eslingas-izaje", "equipos-captura", "mantenimiento-equipos",
    "formatos", "llenado-registros"];
  const secN = id => M.secciones.find(s => s.id === id).n;
  M.procedimientos.sort((a, b) => secN(a.seccion) - secN(b.seccion) || ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

  // ---------- FORMATOS IMPRIMIBLES ----------
  const sino = ["Sí", "No", "Observación"];
  M.formatos = [
    { id: "registro-incidencias", nombre: "Registro de incidencias", uso: "Registrar toda falla detectada en identificación, homologación o recepción.", campos: ["Fecha", "Turno", "Responsable"],
      tabla: { cols: ["Fecha", "Material", "Problema", "Acción realizada", "Responsable", "Estado"], filas: 8 }, firmas: ["Jefe de bodega"] },
    { id: "acta-discrepancia", nombre: "Acta de discrepancia", uso: "Dejar constancia de diferencias entre lo solicitado, documentado y recibido.", campos: ["N° de acta", "Fecha", "Proveedor", "Orden de compra N°", "Guía de despacho N°", "Factura N°"],
      tabla: { cols: ["Código / descripción", "Cant. solicitada", "Cant. recibida", "Diferencia y motivo"], filas: 6 },
      checks: { t: "Acción a seguir", items: ["Reclamo al proveedor", "Devolución", "Reposición", "Nota de crédito", "Evidencia fotográfica adjunta"] }, firmas: ["Bodeguero", "Supervisor de bodega", "Compras"] },
    { id: "pauta-verificacion", nombre: "Pauta de verificación de recepción", uso: "Verificar cantidad y condiciones de un material que ingresa.", campos: ["Fecha", "Guía N°", "Orden de compra N°", "Proveedor"],
      lista: { t: "Puntos de control", cols: sino, items: ["Documentación completa y vigente", "Cantidad coincide con guía y OC", "Código y N° de parte coinciden", "Estado físico conforme (sin daños, corrosión ni humedad)", "Embalaje íntegro", "Etiquetas legibles", "Fecha de vencimiento vigente", "HDS adjunta (si es sustancia química)"] }, firmas: ["Bodeguero", "Supervisor de bodega"] },
    { id: "solicitud-codigo", nombre: "Solicitud de creación de código", uso: "Incorporar un producto nuevo al ERP evitando duplicados.", campos: ["Fecha", "Solicitante", "Descripción estandarizada", "Marca", "Modelo", "N° de parte", "Unidad de medida", "Familia", "Tipo funcional", "Uso", "Equipo asociado", "Justificación"],
      checks: { t: "Validaciones", items: ["Se buscó el producto en el ERP por código, descripción, N° de parte, marca y modelo", "Se validó técnicamente con Mantenimiento", "Se adjunta ficha técnica o catálogo"] }, firmas: ["Solicitante", "Encargado de inventario", "Mantenimiento"] },
    { id: "vale-salida", nombre: "Vale de salida de materiales", uso: "Respaldar toda salida de material desde la bodega.", campos: ["N° de vale", "Fecha", "Solicitante", "Área / centro de costo", "Equipo / orden de trabajo"],
      tabla: { cols: ["Código", "Descripción", "Unidad", "Cant. solicitada", "Cant. entregada"], filas: 8 }, firmas: ["Solicitante", "Autoriza", "Bodeguero", "Recibe conforme"] },
    { id: "checklist-equipo", nombre: "Check list de equipo (grúa horquilla)", uso: "Inspección previa al inicio de cada turno.", campos: ["Fecha", "Equipo", "Operador", "Turno", "Horómetro"],
      lista: { t: "Inspección", cols: ["Conforme", "No conforme", "Observación"], items: ["Operador con autorización vigente", "Frenos", "Alarma de retroceso y bocina", "Luces", "Neumáticos o ruedas", "Horquillas sin grietas ni deformaciones", "Mástil y cadenas", "Fugas de aceite o hidráulico", "Cinturón de seguridad", "Extintor", "Nivel de combustible o batería"] }, firmas: ["Operador", "Supervisor"] }
  ];
  M.documentos = M.formatos.map(f => ({ id: f.id, nombre: f.nombre, ext: "Formato imprimible" }));

  // ---------- AVISOS DE LA PORTADA ----------
  M.actualizaciones = [
    { texto: "Se completaron las 8 secciones del manual", fecha: "10 oct 2026", link: "#/todas" },
    { texto: "Nuevo: módulo de entrenamiento de EPP", fecha: "10 oct 2026", link: "#/quiz/epp" },
    { texto: "Nuevos formatos imprimibles", fecha: "10 oct 2026", link: "#/documentos" },
    { texto: "Complemento: normativa chilena aplicable", fecha: "08 oct 2026", link: "#/proc/normativa" }
  ];

  // ---------- EVALUACIONES ----------
  const Q = (q, o, a, exp) => ({ q, o, a, exp });
  M.quizzes = {
    epp: { titulo: "Módulo de entrenamiento: Uso de EPP", seccion: "seguridad", preguntas: [
      Q("¿Qué EPP protege la cabeza frente a golpes y caída de objetos?", ["Lentes de seguridad", "Casco de seguridad", "Chaleco reflectante"], 1, "El casco protege la cabeza; es obligatorio en toda el área de bodega."),
      Q("¿Para qué se usan los lentes de protección?", ["Proteger los ojos de partículas y salpicaduras", "Mejorar la visión nocturna", "Identificar al trabajador"], 0, "Protegen de partículas, polvo y salpicaduras."),
      Q("¿Cuándo debe usarse el chaleco reflectante?", ["Solo de noche", "En zonas con tránsito de equipos", "Nunca en bodega"], 1, "Permite que operadores de equipos vean a las personas."),
      Q("¿Quién debe entregar los EPP y a qué costo para el trabajador?", ["El trabajador los compra", "El empleador, sin costo", "El comité, con descuento"], 1, "El DS 594 y la Ley 16.744 obligan al empleador a entregarlos sin costo."),
      Q("¿Qué debe hacer con un EPP dañado?", ["Seguir usándolo", "Repararlo por su cuenta", "Reportarlo y solicitar reemplazo antes de trabajar"], 2, "Se inspecciona antes de cada turno y se reemplaza si está dañado.")] },
    generalidades: { titulo: "Evaluación: Generalidades", seccion: "generalidades", preguntas: [
      Q("¿Cuál es el objetivo general del manual?", ["Reducir el personal de bodega", "Estandarizar la gestión de bodega y el control de inventario asegurando disponibilidad, trazabilidad y conservación", "Definir precios de los materiales"], 1, "Ese es el objetivo general planteado en el manual."),
      Q("¿Quién supervisa el orden del inventario y aprueba los movimientos?", ["El jefe de bodega", "El transportista", "El proveedor"], 0, "El jefe de bodega valida que el sistema de ubicación se respete."),
      Q("¿Qué es homologar un material?", ["Cambiarle el precio", "Establecer una forma única y estandarizada de identificarlo y describirlo", "Almacenarlo en altura"], 1, "Evita duplicidades de nombres y códigos.")] },
    almacenamiento: { titulo: "Evaluación: Almacenamiento", seccion: "almacenamiento", preguntas: [
      Q("En la clasificación ABC, ¿dónde se ubican los productos de rotación alta (A)?", ["Al fondo de la bodega", "Cerca de las puertas de salida", "Fuera de la bodega"], 1, "Los A van cerca de la salida para reducir tiempos."),
      Q("¿Qué método de rotación se usa en materiales con fecha de vencimiento?", ["FEFO", "Al azar", "Último en entrar, primero en salir"], 0, "FEFO: primero en vencer, primero en salir."),
      Q("¿Qué se hace con un material sin etiqueta?", ["Se almacena igual", "Permanece en identificación pendiente hasta confirmar su información", "Se descarta"], 1, "No se almacena como disponible hasta validarlo.")] },
    recepcion: { titulo: "Evaluación: Recepción de mercadería", seccion: "recepcion", preguntas: [
      Q("¿Con qué se compara lo recibido físicamente?", ["Solo con la factura", "Con la guía de despacho, la orden de compra y la orden interna", "Con lo que diga el transportista"], 1, "Se verifica contra los tres documentos."),
      Q("Si el material llega dañado, ¿qué se hace?", ["Se registra, se toman fotos, se segrega y se gestiona el reclamo", "Se almacena igual", "Se devuelve sin registrar"], 0, "Se deja evidencia y se separa del stock disponible."),
      Q("Si falta la orden de compra:", ["Se hace el ingreso definitivo", "Se solicita copia a Compras y no se ingresa definitivamente", "Se asigna un código nuevo"], 1, "No se realiza el ingreso definitivo hasta contar con el documento.")] },
    despacho: { titulo: "Evaluación: Despacho de pedidos", seccion: "despacho", preguntas: [
      Q("¿Qué documento respalda la salida de un material?", ["El vale de salida o solicitud autorizada", "Una llamada telefónica", "La factura de compra"], 0, "Ningún material sale sin solicitud autorizada."),
      Q("¿Qué debe verificarse antes de entregar?", ["Que el solicitante esté autorizado y que el stock y la ubicación coincidan", "Solo el color del embalaje", "Nada"], 0, "También se verifica código, cantidad y estado."),
      Q("Si el stock del ERP no coincide con lo físico:", ["Se entrega igual", "Se detiene la entrega, se recuenta y se informa al encargado de inventario", "Se borra el registro"], 1, "Se regulariza antes de continuar.")] },
    inventario: { titulo: "Evaluación: Inventario", seccion: "inventario", preguntas: [
      Q("¿Cómo se calcula la exactitud de identificación?", ["Materiales correctamente identificados ÷ total revisados × 100", "Materiales vendidos ÷ total comprado", "Errores ÷ 100"], 0, "Es el porcentaje de materiales bien identificados."),
      Q("Dos productos parecidos, ¿se pueden homologar?", ["Sí, siempre", "Solo si se valida técnicamente que son el mismo (N° de parte, marca, modelo)", "Nunca"], 1, "Productos que se parecen no necesariamente son el mismo."),
      Q("¿Quién autoriza un ajuste de inventario?", ["El bodeguero solo", "El jefe de bodega (y otras áreas si la política lo exige)", "El proveedor"], 1, "Se ajusta con causa investigada y autorización.")] },
    seguridad: { titulo: "Evaluación: Seguridad y prevención", seccion: "seguridad", preguntas: [
      Q("¿Cuál es el máximo de carga manual para un hombre adulto, cuando no se pueden usar ayudas mecánicas?", ["50 kg", "25 kg", "40 kg"], 1, "Ley 20.949: 25 kg; 20 kg para mujeres y menores de 18 años."),
      Q("¿Qué documento entrega información de peligros y manejo de una sustancia química?", ["La HDS", "La guía de despacho", "La factura"], 0, "La hoja de datos de seguridad (NCh 2245)."),
      Q("Ocurre un accidente en la bodega. ¿Qué haces primero?", ["Lo ignoras si es leve", "Atiendes al lesionado y avisas de inmediato al supervisor y a Prevención", "Esperas al fin de turno"], 1, "Todo hecho se reporta de inmediato.")] },
    herramientas: { titulo: "Evaluación: Herramientas y equipos", seccion: "herramientas", preguntas: [
      Q("¿Qué se hace antes de operar una grúa horquilla?", ["Completar el check list de equipo", "Nada, se opera de inmediato", "Cargar al máximo"], 0, "Se revisa al inicio de cada turno."),
      Q("Un equipo con falla crítica:", ["Se sigue usando con cuidado", "Se rotula «Fuera de servicio» y se informa al supervisor", "Se repara solo"], 1, "No se opera hasta que lo revise personal autorizado."),
      Q("¿Cómo se usa una transpaleta?", ["Con las horquillas apenas bajo el pallet", "Con las horquillas completamente bajo el pallet", "Solo en pendientes"], 1, "Introducir las horquillas completamente.")] },
    formularios: { titulo: "Evaluación: Formularios y registros", seccion: "formularios", preguntas: [
      Q("¿Qué formato se usa para dejar constancia de una diferencia con el proveedor?", ["Acta de discrepancia", "Vale de salida", "Check list de equipo"], 0, "Registra lo solicitado, documentado y recibido."),
      Q("¿Qué versión de un formato se debe usar?", ["Cualquiera", "La última versión vigente", "La más antigua"], 1, "Siempre la última versión."),
      Q("Si se comete un error al llenar un registro:", ["Se usa corrector", "Se tacha con una línea y se firma", "Se rompe la hoja"], 1, "Así se conserva la trazabilidad.")] }
  };
})();
