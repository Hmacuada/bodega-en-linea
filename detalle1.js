// DETALLE 1 – Generalidades y Almacenamiento (contenido ampliado: objetivo, alcance, pasos con detalle, ejemplo, controles y errores)
window.DET = window.DET || {};
Object.assign(window.DET, {
  "objetivo-manual": {
    objetivo: "Estandarizar la gestión de la bodega y el control del inventario para asegurar disponibilidad, trazabilidad y conservación de los productos.",
    alcance: "Todo el personal de bodega, abastecimiento, mantenimiento y prevención que participe en la recepción, almacenamiento, despacho y control de materiales, repuestos, herramientas, EPP e insumos.",
    pasos: [
      ["Conocer el ciclo completo", "Revise la ruta del material (recepción, identificación, homologación, almacenamiento, despacho e inventario) para saber en qué etapa interviene su cargo."],
      ["Identificar su rol", "Lea «Roles y responsabilidades»: cada etapa tiene encargados, documentos y recursos definidos."],
      ["Aplicar el procedimiento de su etapa", "Siga los pasos en el orden indicado; no omita verificaciones aunque el material sea urgente."],
      ["Registrar y documentar", "Todo movimiento queda registrado en el ERP y respaldado por un documento firmado."],
      ["Reportar fallas", "Ante discrepancias, códigos incorrectos o daños, aplique la acción correctiva y registre la incidencia."],
      ["Medir y mejorar", "Use los indicadores del manual para detectar errores y proponer mejoras."]
    ],
    ejemplo: "Llega un repuesto hidráulico para un equipo de mina. El bodeguero lo recibe contra la guía y la orden de compra, el encargado de inventario valida su código, se etiqueta y se ubica en rack. Dos días después, mantenimiento lo solicita con un vale y sale con registro: en todo momento se sabe dónde está y quién lo tiene.",
    controles: ["Cada material tiene documento, código, etiqueta y ubicación.", "Las diferencias se separan y registran antes de usarse.", "Los indicadores se revisan periódicamente.", "Todo el personal conoce el procedimiento de su etapa."],
    errores: ["Ingresar material «por urgencia» sin validar documentos.", "Usar códigos o nombres distintos para el mismo producto.", "No registrar los movimientos internos.", "Resolver diferencias sin dejar evidencia."]
  },
  "roles": {
    objetivo: "Dejar claro quién ejecuta, quién autoriza y quién apoya en cada etapa del proceso, para evitar vacíos y duplicidades de responsabilidad.",
    alcance: "Personal de bodega y áreas de apoyo (mantenimiento, abastecimiento, prevención de riesgos y contabilidad).",
    ejemplo: "Un repuesto llega sin código. El bodeguero lo separa (su responsabilidad), el encargado de inventario solicita la creación del código, mantenimiento valida el N° de parte y el jefe de bodega autoriza el ingreso. Nadie decide solo.",
    controles: ["Cada rol conoce sus funciones y a quién reportar.", "Las autorizaciones críticas (ajustes, bajas, excepciones) las da el jefe de bodega.", "Las áreas de apoyo responden en los plazos acordados."],
    errores: ["Que el bodeguero cree códigos nuevos sin pasar por inventario.", "Aprobar ajustes sin la autorización del jefe de bodega.", "No avisar a Compras cuando hay discrepancias con el proveedor."]
  },
  "zonas-bodega": {
    objetivo: "Que cada material esté en la zona que corresponde a su estado y función, y que las zonas estén demarcadas y señalizadas.",
    alcance: "Todas las áreas físicas de la bodega y el patio techado.",
    pasos: [
      ["Reconocer las zonas", "Ubique en el plano las zonas de recepción, racks, gavetas, área especial, mesa de preparación, identificación pendiente y cuarentena."],
      ["Respetar la demarcación", "Pasillos, zonas de carga y salidas deben mantenerse libres y demarcados."],
      ["Usar cada zona para su fin", "No almacenar material conforme en cuarentena ni material por validar en los racks."],
      ["Registrar las ubicaciones", "Cada ubicación nueva se crea en el ERP antes de usarse."],
      ["Revisar la señalización", "Reponer carteles dañados y verificar que el plano esté actualizado."]
    ],
    ejemplo: "Un lote de lubricantes llega con un envase roto. Se descarga en la zona de recepción, el envase dañado pasa a cuarentena y el resto se traslada al área especial con su HDS.",
    controles: ["El plano publicado coincide con la bodega real.", "Hay señalización visible de cada zona.", "Las zonas de cuarentena e identificación pendiente están vacías de material conforme."],
    errores: ["Dejar carga en pasillos «solo un momento».", "Usar el piso demarcable como bodega permanente.", "No actualizar el plano al mover racks."]
  },
  "glosario": {
    objetivo: "Unificar el lenguaje de la bodega para que todos entiendan igual los términos del manual.",
    alcance: "Todo el personal que use este manual.",
    ejemplo: "Cuando el manual dice «homologar», significa dejar un solo registro estándar para un producto que se nombraba de varias formas; no es lo mismo que «codificar» (asignar código).",
    controles: ["Los nuevos integrantes conocen el glosario en su inducción.", "Los términos del glosario se usan igual en documentos y en el ERP."]
  },
  "conclusion": {
    objetivo: "Recoger las ideas clave del manual y su aporte a la continuidad operacional.",
    alcance: "Todo el manual.",
    controles: ["La bodega aplica los procedimientos de forma consistente.", "Las fallas se registran y se corrigen.", "Los indicadores se usan para mejorar."]
  },

  // ---------------- ALMACENAMIENTO ----------------
  "ubicacion": {
    objetivo: "Definir dónde se guarda cada material para optimizar el espacio, reducir los tiempos de búsqueda y mantener el inventario trazable.",
    alcance: "Todo material conforme que ingresa a la bodega y todo cambio de ubicación.",
    pasos: [
      ["Clasificar por rotación (ABC)", "Defina si el material es A (alta), B (media) o C (baja rotación) según su consumo histórico."],
      ["Elegir el método de ubicación", "Fija: cada producto con un lugar único. Variable: el sistema asigna el espacio libre disponible."],
      ["Asignar la coordenada", "Use la codificación de ubicaciones (por ejemplo, rack-nivel-posición) y emita la orden de almacenamiento."],
      ["Trasladar con el equipo adecuado", "Use transpaleta, grúa horquilla o apilador según peso y altura."],
      ["Escanear y confirmar", "El bodeguero escanea la etiqueta y la ubicación para confirmar el movimiento."],
      ["Actualizar el registro", "El analista valida que el ERP refleje la nueva ubicación."]
    ],
    ejemplo: "Un filtro de alta rotación se asigna a la zona A, rack R01, nivel B, posición 03 (R01-B-03). El bodeguero escanea el filtro y la ubicación; desde ese momento cualquiera puede encontrarlo en segundos.",
    controles: ["Toda ubicación está codificada y registrada.", "Los ítems A están cerca de la salida.", "El jefe de bodega valida que se respete el sistema de ubicación.", "Los cambios de ubicación se registran el mismo día."],
    errores: ["Guardar «donde hay espacio» sin registrar la ubicación.", "Mezclar códigos distintos en una misma posición.", "Dejar material sin etiquetar en el rack.", "Colocar material pesado en niveles altos."]
  },
  "almacenamiento-seguro": {
    objetivo: "Almacenar los materiales de forma que no se dañen, no generen riesgos y puedan retirarse con seguridad.",
    alcance: "Racks, gavetas, piso demarcable y área especial.",
    pasos: [
      ["Verificar el área", "Antes de ingresar la carga, revise que el piso esté limpio, los pasillos libres y los racks sin daños."],
      ["Ubicar los materiales pesados abajo", "Los componentes de mayor peso van en los niveles inferiores y las cargas livianas en altura."],
      ["Respetar la capacidad", "Cada rack tiene una capacidad máxima indicada; nunca exceda el límite."],
      ["Mantener pasillos y salidas despejados", "Los pasillos permiten el tránsito de equipos y la evacuación."],
      ["Aplicar rotación", "Use FIFO, o FEFO en materiales con vencimiento."],
      ["Segregar los peligrosos", "Las sustancias peligrosas solo en el área especial, con HDS disponible y separando incompatibles."],
      ["Registrar la ubicación", "Deje la ubicación en el ERP antes de retirarse."]
    ],
    ejemplo: "Un pallet de 800 kg de repuestos se ubica en el nivel 1 del rack. Un envase de aceite de 20 L se lleva al área especial, sobre una bandeja de contención. El pasillo queda libre para la grúa.",
    controles: ["Capacidad de racks señalizada y respetada.", "Pasillos libres de obstáculos.", "Sustancias peligrosas con HDS y rotulado.", "Material apilado de forma estable."],
    errores: ["Sobrecargar un nivel de rack.", "Apilar bultos sin estabilidad.", "Bloquear extintores o salidas.", "Guardar químicos junto a material combustible."],
    tips: [{ tipo: "ok", texto: "Use técnicas correctas de levantamiento y pida ayuda en cargas pesadas." }]
  },
  "almacenaje-tipo": {
    objetivo: "Aplicar el criterio de almacenamiento adecuado a cada familia de material para conservarlo y evitar riesgos.",
    alcance: "Repuestos, lubricantes, químicos, EPP, material eléctrico, mangueras y otros.",
    ejemplo: "Una manguera hidráulica nueva se guarda enrollada y con sus extremos tapados. Un lote de guantes se almacena en un estante seco, lejos de la luz solar, con su fecha de vencimiento a la vista.",
    controles: ["Se siguen las instrucciones del fabricante.", "Se revisa la HDS de cada producto químico.", "Los materiales con vencimiento tienen su fecha visible."],
    errores: ["Almacenar EPP en lugares húmedos.", "Dejar mangueras con los extremos abiertos.", "Guardar lubricantes junto a fuentes de calor."]
  },
  "rotacion-fifo-fefo": {
    objetivo: "Evitar vencimientos, obsolescencia y pérdidas, asegurando que sale primero el material correcto.",
    alcance: "Todo material con fecha de ingreso o de vencimiento.",
    pasos: [
      ["Registrar fechas y lote", "Al ingresar, anote fecha de ingreso, vencimiento y lote en el ERP."],
      ["Ubicar según la regla", "El lote más antiguo o que vence antes queda al frente o en el nivel de más fácil acceso."],
      ["Retirar el lote que indica el ERP", "En el despacho, el sistema sugiere qué lote entregar."],
      ["Revisar vencimientos cada mes", "Liste lo que vence en los próximos 90 días y avise a Abastecimiento y al usuario."],
      ["Mover lo vencido a cuarentena", "Identifíquelo como «Vencido» y gestione su baja."]
    ],
    ejemplo: "Dos lotes del mismo lubricante: uno vence en 03/2027 y otro en 08/2027. Aunque el segundo entró antes, se despacha primero el que vence antes (FEFO).",
    controles: ["Cada lote está identificado y separado.", "Hay un reporte mensual de próximos vencimientos.", "Ningún material vencido está en stock disponible."],
    errores: ["Mezclar lotes en una misma caja.", "Retirar siempre «lo que está más a mano».", "No registrar la fecha de vencimiento."]
  },
  "codificar-etiquetar": {
    objetivo: "Identificar cada artículo de forma única y rápida mediante un código y una etiqueta legible.",
    alcance: "Todo material que ingresa a la bodega.",
    pasos: [
      ["Definir el código", "Use el sistema alfanumérico: letras y números que indican categoría, tipo y características del producto."],
      ["Elegir el tipo de etiqueta", "Código de barras (lectura láser), RFID (lectura a distancia) o QR (más información en poco espacio)."],
      ["Imprimir con los datos mínimos", "Código, descripción, unidad de medida, lote o serie, fecha de ingreso y ubicación."],
      ["Pegar en un lugar visible", "Sobre una superficie limpia y seca, sin tapar información del fabricante."],
      ["Probar la lectura", "Escanee la etiqueta antes de dar por terminado el etiquetado."]
    ],
    ejemplo: "Un rodamiento recibe el código 000123. Se imprime una etiqueta con código de barras, descripción, unidad (UN), lote y ubicación R01-B-03, y se pega en la caja con funda protectora.",
    controles: ["La etiqueta es legible y resistente a la bodega.", "El código físico coincide con el ERP.", "La etiqueta se probó con el lector."],
    errores: ["Pegar la etiqueta sobre una tapa que se abre.", "Usar impresoras con baja calidad que desvanecen la tinta.", "Asignar códigos distintos al mismo producto."]
  },
  "identificar": {
    objetivo: "Establecer un procedimiento estandarizado para identificar correctamente materiales, repuestos, herramientas, equipos y EPP que ingresan, permanecen o salen de la bodega.",
    alcance: "Repuestos, herramientas, EPP, lubricantes, materiales eléctricos y mecánicos, componentes hidráulicos, sustancias químicas y componentes críticos con serie o lote.",
    pasos: [
      ["Recepción del material", "El bodeguero recibe el material y verifica que exista documentación asociada antes de incorporarlo."],
      ["Revisión de documentos", "Orden de compra, guía de despacho, factura, solicitud, traslado interno y documentación técnica."],
      ["Inspección física", "Compruebe código, descripción, marca, modelo, N° de parte, serie, lote, cantidad, unidad y estado. En repuestos, que correspondan al equipo."],
      ["Comparación", "Compare lo físico con lo documental y con el ERP."],
      ["Etiquetado", "Etiqueta legible con código, descripción, unidad, lote o serie, fecha de ingreso y ubicación."],
      ["Registro en el sistema", "Solo con la información validada se registra el producto."],
      ["Almacenamiento", "El material se traslada a su ubicación definitiva."]
    ],
    ejemplo: "La guía dice «Filtro hidráulico, N° parte XYZ». El bodeguero lee la caja: coincide el N° de parte pero la marca es otra. No lo ingresa: lo deja en identificación pendiente y consulta a mantenimiento.",
    controles: ["Todos los datos obligatorios están completos.", "Lo físico, lo documental y el ERP coinciden.", "Lo que no coincide queda separado y registrado."],
    errores: ["Asignar un código «provisorio» arbitrario.", "Confiar solo en la apariencia del repuesto.", "Registrar con la unidad de medida equivocada."],
    bloques: [
      { t: "Recursos materiales y tecnológicos", lista: ["Materiales: etiquetas, marcadores, estanterías, packs, pallets, contenedores, zona de identificación pendiente, EPP y señalización.", "Tecnológicos: computador, sistema ERP, lector de código de barras, impresora de etiquetas, sistema de gestión de inventario y cámara o dispositivo para registrar evidencias."] },
      { t: "Resultado esperado", lista: ["Cada material queda correctamente identificado, etiquetado, registrado y asociado a una ubicación, listo para su almacenamiento, control y despacho.", "Si hay diferencias o información incompleta, el material permanece separado hasta que su identificación sea válida.", "Se reducen los errores de inventario y se evita entregar repuestos o insumos incorrectos, mejorando la continuidad operacional."] }
    ]
  },
  "fallas-identificacion": {
    objetivo: "Resolver de forma estándar las fallas de identificación sin comprometer la exactitud del inventario.",
    alcance: "Cualquier falla detectada en identificación: sin código, ilegible, duplicado, dañado, incompatible, etc.",
    ejemplo: "Un lote de 100 rodamientos se recibe, pero físicamente hay 95. Se realiza un segundo conteo, se revisan los embalajes, se registra la diferencia y se informa al jefe de bodega y al proveedor. El ERP solo se actualiza con la cantidad validada.",
    controles: ["Todo material con falla queda en la zona de identificación pendiente.", "Cada falla tiene registro de incidencia.", "Las fallas repetidas se analizan con el proveedor."],
    errores: ["Cerrar la recepción sin resolver la falla.", "Corregir el ERP sin evidencia.", "Mezclar material con falla con el stock disponible."]
  },
  "tipo-uso": {
    objetivo: "Clasificar cada material por su tipo funcional y su uso, para su correcto almacenamiento, control y utilización.",
    alcance: "Todo material nuevo o con clasificación pendiente.",
    pasos: [
      ["Identificar el tipo funcional", "Consumo, repuesto, herramienta, EPP, lubricante o reactivo."],
      ["Determinar el uso principal", "Mantención, operación o seguridad."],
      ["Verificar la coherencia", "La clasificación debe corresponder a las características y la función real."],
      ["Registrar en la matriz de clasificación", "Complete los campos obligatorios de tipo y uso."],
      ["Avanzar a atributos de control", "Con la clasificación validada, el ítem pasa a la consulta de atributos."]
    ],
    ejemplo: "Guantes de seguridad anticorte: Tipo funcional = EPP; Uso = Seguridad. Justificación: protegen contra cortes durante actividades operacionales o de mantención.",
    controles: ["Tipo y uso están registrados en la matriz.", "Se cuenta con ficha técnica o catálogo como respaldo."],
    errores: ["Clasificar un repuesto como consumo.", "Dejar el campo «uso» vacío.", "Basar la clasificación solo en el nombre del producto."]
  },
  "atributos-control": {
    objetivo: "Consultar, verificar y validar todos los atributos de la mercadería para mantener un inventario confiable y trazable.",
    alcance: "Repuestos, EPP, herramientas, lubricantes y materiales eléctricos, mecánicos e hidráulicos.",
    pasos: [
      ["Recepción del material", "Verifique la documentación disponible."],
      ["Revisión de documentos", "Orden de compra, guía, factura y ficha técnica."],
      ["Inspección física", "Código, marca, modelo, N° de parte, serie, lote, cantidad y estado."],
      ["Comparación", "Contraste lo físico con lo documental y con el ERP."],
      ["Etiquetado", "Código, descripción, unidad, lote o serie, fecha de ingreso y ubicación."],
      ["Registro en el sistema", "Actualice el ERP con la información validada."],
      ["Almacenamiento o zona pendiente", "Si hay una falla, el material se traslada a identificación pendiente."]
    ],
    ejemplo: "Un repuesto llega sin equipo asociado registrado. El encargado consulta el catálogo del fabricante, confirma con mantenimiento que es para un equipo específico y deja el equipo asociado en la ficha del material.",
    controles: ["Los 10 atributos están validados.", "Las diferencias se registran en la incidencia.", "El material con diferencia permanece separado hasta validar."],
    errores: ["Ingresar con atributos incompletos.", "No registrar el equipo asociado de un repuesto.", "Asumir que dos productos parecidos son iguales."],
    bloques: [
      { t: "Encargados", lista: ["Jefe de bodega: supervisa el proceso, resuelve diferencias, coordina con abastecimiento y mantenimiento y asegura el cumplimiento.", "Encargado de inventario: valida códigos y descripciones, crea o solicita códigos, controla diferencias y mantiene la trazabilidad.", "Bodeguero: revisa físicamente, compara con la documentación, verifica etiquetas, informa diferencias, etiqueta y ubica.", "Administrativo de bodega: registra en el ERP, revisa documentación y mantiene registros.", "Área de mantenimiento: apoya la identificación técnica, confirma compatibilidad y valida el N° de parte."] },
      { t: "Recursos", lista: ["Materiales: etiquetas, marcadores, estanterías, pallets, contenedores, zona de identificación pendiente señalizada, ordenada y separada, EPP y señalización.", "Tecnológicos: computador, sistema ERP, lector de código de barras, impresora de etiquetas y cámara para evidencia."] },
      { t: "Documentación y su función", tabla: { cols: ["Documento", "Función"], rows: [["Orden de compra", "Identificar lo solicitado"], ["Guía de despacho", "Comprobar lo enviado por el proveedor"], ["Factura", "Respaldar la adquisición"], ["Registro de recepción", "Dejar evidencia del ingreso"], ["Ficha técnica / catálogo", "Verificar las características"], ["Solicitud de creación de código", "Incorporar productos nuevos"], ["Registro de incidencia", "Dejar evidencia de problemas"]] } },
      { t: "Indicadores de control", tabla: { cols: ["Indicador", "Fórmula"], rows: [["Exactitud de atributos", "Materiales con atributos correctos ÷ total revisados × 100"], ["Porcentaje sin código", "Materiales sin código ÷ total recibidos × 100"], ["Tasa de errores", "Errores detectados ÷ total consultados × 100"]] } },
      { t: "Registro de incidencias por atributo", tabla: { cols: ["Fecha", "Material", "Atributo fallado", "Acción realizada", "Responsable", "Estado"], rows: [["01/09/2026", "Repuesto hidráulico", "Sin código", "Solicitar creación", "Encargado de inventario", "Pendiente"]] } },
      { t: "Resultado esperado", lista: ["Cada material validado en todos sus atributos, etiquetado, registrado y asociado a una ubicación.", "Si existe una diferencia, el material permanece separado hasta validar el atributo; así se reducen errores y se evita entregar repuestos incorrectos."] }
    ]
  },
  "etiquetar": {
    objetivo: "Dejar cada material identificado con una etiqueta visible, resistente y coherente con la documentación y el ERP.",
    alcance: "Todo material recibido, reubicado o que requiera reetiquetado.",
    pasos: [
      ["Identificar cada material recibido", "Confirme el código y la descripción contra la documentación."],
      ["Verificar la información de la etiqueta", "Debe coincidir con la guía, la OC y el ERP."],
      ["Asignar código interno, de barras o QR", "Según el tipo de material y el equipo de lectura disponible."],
      ["Registrar el material en el ERP", "Antes de ubicar el material."],
      ["Colocar la etiqueta", "En un lugar visible y seguro."],
      ["Indicar los datos mínimos", "Código, descripción, cantidad, unidad de medida y ubicación."],
      ["Reemplazar etiquetas dañadas", "Reimprima las ilegibles."],
      ["Señalizar materiales peligrosos", "Deben tener su identificación y señalización correspondiente."]
    ],
    ejemplo: "Una etiqueta se moja y el código queda ilegible. El bodeguero identifica el material por su descripción y características, confirma el código, reimprime la etiqueta y verifica que se lea con el lector.",
    controles: ["La etiqueta se lee con el lector.", "Los materiales peligrosos tienen rotulado.", "Las etiquetas dañadas se reemplazan al detectarlas."],
    errores: ["Pegar etiquetas sobre otras etiquetas.", "Escribir datos a mano sin validar.", "Dejar material peligroso sin su señalización."],
    bloques: [
      { t: "Encargados", lista: ["Encargado de bodega", "Operador de bodega", "Supervisor de bodega", "Personal de control de inventario"] },
      { t: "Documentación", lista: ["Orden de compra", "Guía de despacho", "Factura", "Registro de recepción de materiales", "Ficha de material", "Registro de inventario", "Procedimiento de identificación y etiquetado", "Registro de códigos de barra o código interno"] }
    ]
  }
});
