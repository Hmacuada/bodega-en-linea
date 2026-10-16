// DETALLE 2 – Recepción de mercadería y Despacho de pedidos
window.DET = window.DET || {};
Object.assign(window.DET, {
  // ---------------- RECEPCIÓN ----------------
  "preparacion-recepcion": {
    objetivo: "Tener coordinados el proveedor, los documentos, el área y los equipos antes de que llegue la mercadería.",
    alcance: "Toda recepción programada de materiales, repuestos, herramientas, EPP e insumos.",
    pasos: [
      ["Coordinar la llegada con el proveedor", "Acuerde día y hora de llegada para que haya personal y equipos disponibles."],
      ["Reunir la documentación", "Orden de compra y orden interna; si hay aviso de despacho o programa de recepción, revíselos."],
      ["Segregar el área de descarga", "Delimite la zona con conos o cinta y retire obstáculos."],
      ["Preparar equipos", "Grúa horquilla o transpaleta con mantención al día y check list completado."],
      ["Disponer EPP y recursos de verificación", "Pesa, huincha, lector de códigos y sistema de inventario habilitado."],
      ["Confirmar roles", "Defina quién descarga, quién verifica y quién registra."]
    ],
    ejemplo: "Compras avisa que mañana a las 10:00 llega un camión con 6 pallets de repuestos. El bodeguero prepara la OC, despeja la zona P01, comprueba que la grúa tenga su check list y asigna a un segundo bodeguero para el conteo.",
    controles: ["La OC y la orden interna están disponibles.", "El área de descarga está delimitada.", "Los equipos tienen mantención y check list al día.", "Existe un responsable por cada tarea."],
    errores: ["Recibir sin haber coordinado el horario.", "Descargar sin delimitar el área.", "Usar equipos sin check list."]
  },
  "recepcion-documentos": {
    objetivo: "Verificar y registrar correctamente la documentación y el vehículo que llega para asegurar la trazabilidad del material.",
    alcance: "Portería o control de acceso, andén asignado y bodega de recepción.",
    pasos: [
      ["Registrar el ingreso del vehículo", "Anote patente, conductor, proveedor y hora de llegada en el registro de ingreso."],
      ["Dirigir al andén asignado", "Indique la zona de descarga y las medidas de seguridad al conductor."],
      ["Recibir y revisar documentos", "Guía de despacho y factura; compárelas con la orden de compra."],
      ["Inspección visual de la carga", "Busque daños evidentes, humedad o embalaje roto antes de descargar."],
      ["Levantar acta de observaciones", "Si algo no cuadra, déjelo escrito antes de iniciar la descarga."],
      ["Autorizar la descarga", "El supervisor valida y se inicia la descarga."]
    ],
    ejemplo: "La guía de despacho indica 10 cajas pero la OC menciona 12. El bodeguero lo deja anotado en el acta de observaciones, avisa a Compras y recién entonces inicia la descarga, registrando lo que realmente llegue.",
    controles: ["Hora de llegada y observaciones registradas.", "Documentos completos y vigentes.", "Acta de observaciones firmada cuando corresponde."],
    errores: ["Aceptar guías sin firma o con datos ilegibles.", "No registrar la hora de llegada.", "Descargar antes de revisar los documentos."]
  },
  "descarga": {
    objetivo: "Descargar la mercadería de forma segura y ordenada, sin mezclar cargas ni dañar los materiales.",
    alcance: "Operadores de equipos, bodegueros, transportistas y supervisión durante la descarga.",
    pasos: [
      ["Delimitar el área y usar EPP", "Conos y cinta en el perímetro; casco, chaleco, calzado de seguridad y guantes."],
      ["Verificar autorizaciones", "El operador debe estar autorizado y el equipo con mantención al día."],
      ["Evaluar peso, volumen y tipo", "Determine el método: manual, transpaleta, grúa horquilla o eslingas."],
      ["Descargar con control", "Sin golpear ni arrastrar; nunca pasar bajo cargas suspendidas."],
      ["Dejar la carga en la zona de recepción", "Sin mezclar con la mercadería anterior."],
      ["Ordenar por ítem", "Agrupe por código o por documento y separe lo dañado."],
      ["Registrar incidentes", "Cualquier golpe, caída o daño se anota en el registro de incidentes."]
    ],
    ejemplo: "Llegan 4 pallets y 2 cajas sueltas. La grúa descarga los pallets en P01 en el orden de la guía. Las cajas se cargan a mano (menos de 25 kg) y una de ellas, aplastada, se separa y se fotografía.",
    controles: ["No hay personas bajo la carga.", "Cada ítem queda agrupado e identificado.", "El material dañado está separado y registrado."],
    errores: ["Mezclar la carga nueva con la anterior.", "Descargar sin delimitar el área.", "Levantar pesos superiores al límite legal sin ayuda mecánica."],
    tips: [{ tipo: "info", texto: "Para el manejo manual de cargas respete los límites legales (ver Seguridad y prevención)." }]
  },
  "recepcion-peligrosos": {
    objetivo: "Recibir sustancias peligrosas con los controles adicionales que exige su riesgo.",
    alcance: "Lubricantes, químicos, solventes, gases y otras sustancias clasificadas según NCh 382.",
    controles: ["HDS vigente en bodega antes de ingresar el producto.", "Envases íntegros y etiquetados.", "Almacenamiento directo en el área especial autorizada.", "Kit antiderrames disponible."],
    errores: ["Recibir químicos sin HDS.", "Descargar envases con fugas sin avisar a Prevención.", "Dejar sustancias incompatibles en la misma zona."],
    ejemplo: "Llegan 10 tambores de lubricante. Uno presenta goteo. Se detiene la descarga de ese tambor, se contiene con material absorbente, se avisa a Prevención y se registra la incidencia; los 9 restantes se llevan al área especial."
  },
  "verificacion": {
    objetivo: "Comprobar que lo recibido coincide en cantidad, características y estado con lo documentado antes de firmar la guía.",
    alcance: "Bodeguero, supervisor, usuarios solicitantes y especialistas técnicos.",
    pasos: [
      ["Contar, pesar o medir", "Cuente bultos y unidades; use pesa y huincha o pie de metro cuando corresponda."],
      ["Revisar la información del producto", "Marca, modelo, dimensión, grado o ficha técnica."],
      ["Revisar el estado", "Daños, vencimiento, corrosión, humedad y accesorios."],
      ["Cuadrar contra los documentos", "La cantidad debe coincidir con la guía de despacho, la OC y la orden interna."],
      ["Separar conforme de observado", "El material con observaciones va a la zona demarcada de material no conforme."],
      ["Firmar la guía", "Indique «conforme» o «con observaciones» y detalle lo observado."]
    ],
    ejemplo: "La guía indica 50 pernos de grado 8. El bodeguero cuenta 50, pero al revisar las cajas ve que son de grado 5. Firma «con observaciones», separa el lote y lo informa al supervisor y a Compras.",
    controles: ["Cantidad, producto y estado coinciden con los documentos.", "Hay respaldo fotográfico de las observaciones.", "La guía quedó firmada con la condición real."],
    errores: ["Firmar «conforme» sin contar.", "No revisar el grado o modelo en repuestos.", "Mezclar el material observado con el conforme."]
  },
  "registro-ingreso": {
    objetivo: "Ingresar formalmente al ERP el material conforme, con sus datos de trazabilidad y respaldo documental.",
    alcance: "Bodeguero, administrativo de bodega, supervisor, abastecimiento y contabilidad.",
    pasos: [
      ["Registrar cantidad conforme y unidad", "Con la documentación de respaldo (guía, factura, OC)."],
      ["Registrar datos de trazabilidad", "Lote, N° de serie y fecha de vencimiento cuando corresponda."],
      ["Recepcionar contra la OC y orden interna", "Evite recibir por sobre lo solicitado sin autorización."],
      ["Registrar aparte lo observado", "Para no confundir el material aceptado con el que está en observación."],
      ["Archivar los respaldos", "Guía, factura y nota de entrada ordenadas."],
      ["Informar el resultado", "Comunique qué se aceptó y qué quedó en observación."]
    ],
    ejemplo: "De 100 unidades recibidas, 95 están conformes y 5 dañadas. Se ingresan 95 al stock disponible y 5 a «cuarentena», con la nota de entrada y el acta de discrepancia como respaldo.",
    controles: ["El ERP refleja solo lo conforme como disponible.", "Los datos de lote y serie están completos.", "La documentación está archivada."],
    errores: ["Ingresar todo como disponible y corregir después.", "Omitir el lote o el vencimiento.", "No archivar la guía firmada."]
  },
  "discrepancias": {
    objetivo: "Identificar, registrar y resolver cualquier diferencia entre lo solicitado, lo documentado y lo recibido, asegurando que el material no conforme no sea utilizado.",
    alcance: "Bodeguero, supervisor de bodega, Abastecimiento/Compras y proveedor.",
    ejemplo: "Se recibe una caja de filtros con la mitad de las unidades. El bodeguero registra la diferencia, toma fotos, separa el lote y avisa al supervisor. Compras reclama al proveedor, que envía las unidades faltantes. El caso se cierra cuando el stock coincide con la guía.",
    controles: ["Toda discrepancia tiene acta y evidencia.", "El material no conforme está en cuarentena.", "El caso se cierra solo cuando se resuelve y se actualizan los registros."],
    errores: ["Resolver «de palabra» con el transportista.", "Ingresar el material y reclamar después.", "No avisar a Compras."]
  },

  // ---------------- DESPACHO ----------------
  "despacho-pedidos": {
    objetivo: "Entregar al solicitante el material correcto, en la cantidad y estado adecuados, con respaldo documental y registro en el ERP.",
    alcance: "Todas las salidas de materiales desde la bodega.",
    pasos: [
      ["Recibir y validar la solicitud", "Vale de salida u orden interna; confirme que el solicitante está autorizado."],
      ["Verificar stock y ubicación en el ERP", "Confirme que haya disponibilidad y dónde está el material."],
      ["Retirar el material (picking)", "Aplique FIFO/FEFO según lo que indique el ERP."],
      ["Verificar en la mesa de preparación", "Compare código, cantidad y estado contra la solicitud."],
      ["Embalar y rotular", "Incluya HDS si es sustancia química y proteja el material."],
      ["Entregar y obtener firma", "El solicitante firma la recepción conforme."],
      ["Registrar la salida", "Actualice el ERP y la tarjeta de existencia."]
    ],
    ejemplo: "Mantenimiento solicita 2 filtros de aceite para un camión. El bodeguero verifica la autorización, retira 2 filtros del lote más antiguo, los revisa en la mesa, el solicitante firma el vale y el ERP descuenta 2 unidades.",
    controles: ["No hay salida sin vale autorizado.", "Código y cantidad se verifican antes de entregar.", "El ERP queda actualizado el mismo día."],
    errores: ["Entregar sin vale «por confianza».", "No verificar el N° de parte con mantenimiento.", "Registrar la salida días después."]
  },
  "vale-salida": {
    objetivo: "Asegurar que toda salida de material tenga una solicitud autorizada y trazable.",
    alcance: "Solicitantes de todas las áreas, supervisores autorizantes y personal de bodega.",
    controles: ["El vale está completo y firmado.", "El solicitante está en la lista de autorizados.", "Las salidas de urgencia se regularizan al día hábil siguiente."],
    errores: ["Aceptar vales sin firma.", "Dejar vales sin el equipo u OT asociados.", "Entregar a personas no autorizadas."],
    ejemplo: "Un mecánico necesita una pieza a las 02:00. El jefe de turno autoriza por teléfono; el bodeguero entrega y deja constancia. Al día siguiente el vale se completa y se firma."
  },
  "despacho-peligrosos-epp": {
    objetivo: "Entregar EPP y sustancias peligrosas con el registro y la información de seguridad necesarios.",
    alcance: "Entrega de EPP a trabajadores y de químicos a usuarios.",
    pasos: [
      ["Verificar el EPP", "Talla, vigencia y certificación."],
      ["Registrar la entrega", "Con nombre y firma del trabajador."],
      ["Recordar su uso correcto", "Capacite o recuerde cómo usar y mantener el EPP."],
      ["Entregar químicos en su envase original", "O en un envase debidamente rotulado."],
      ["Indicar dónde consultar la HDS", "O entregue una copia."],
      ["Cuidar la compatibilidad en el traslado", "No transporte juntas sustancias incompatibles."],
      ["Registrar la salida", "Con lote y cantidad en el ERP."]
    ],
    ejemplo: "Se entregan guantes anticorte a un nuevo trabajador. Se registra la talla, la fecha y su firma; se le explica cuándo cambiarlos y se le indica dónde pedir reposición.",
    controles: ["Registro de entrega de EPP firmado.", "HDS disponible en la entrega de químicos.", "Envases rotulados."],
    errores: ["Entregar EPP sin registro.", "Entregar químicos en envases sin etiqueta.", "Entregar EPP vencido."]
  },
  "registrar-derivar": {
    objetivo: "Registrar formalmente los movimientos de materiales y derivarlos al área correspondiente, manteniendo la trazabilidad.",
    alcance: "Bodeguero, analista y administrativo de bodega.",
    ejemplo: "Un repuesto recibido es para el taller de mantención. Se registra la recepción, se genera el documento de derivación, se traslada con transpaleta al taller y el ERP refleja el cambio de ubicación.",
    controles: ["La información registrada coincide con la documentación.", "Cada derivación tiene documento de traslado.", "Las diferencias se informan de inmediato."],
    errores: ["Derivar sin registrar el traslado.", "No actualizar las existencias.", "Archivar documentos sin ordenar."]
  },
  "devoluciones": {
    objetivo: "Gestionar devoluciones de usuarios y a proveedores manteniendo el inventario exacto.",
    alcance: "Material devuelto por usuarios y material no conforme enviado al proveedor.",
    ejemplo: "Un técnico devuelve 3 de las 5 mangueras que retiró. Bodega verifica que estén sin uso y con su embalaje, las reingresa al rack con su etiqueta y emite el documento de devolución.",
    controles: ["Toda devolución tiene documento firmado.", "Lo devuelto por usuarios se revisa antes de reingresar.", "Las devoluciones a proveedor tienen nota de crédito o reposición."],
    errores: ["Reingresar material sin revisar.", "Enviar al proveedor sin guía de devolución.", "No actualizar el ERP."]
  }
});
