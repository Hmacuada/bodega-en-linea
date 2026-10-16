// DETALLE 3 – Inventario y Seguridad
window.DET = window.DET || {};
Object.assign(window.DET, {
  // ---------------- INVENTARIO ----------------
  "control-inventario": {
    objetivo: "Asegurar que el inventario registrado coincida con el físico, detectando y corrigiendo diferencias a tiempo.",
    alcance: "Todas las ubicaciones de la bodega: racks, gavetas, piso, área especial y zonas de apoyo.",
    pasos: [
      ["Programar el conteo", "Defina si es cíclico (por clase ABC) o general, y restrinja los movimientos en la zona a contar."],
      ["Preparar la hoja de conteo", "Emita la lista por ubicación sin mostrar el stock del sistema (conteo ciego)."],
      ["Contar por ubicación", "Un contador cuenta y registra; otro verifica las diferencias."],
      ["Comparar con el ERP", "Calcule la diferencia por ítem."],
      ["Investigar las causas", "Revise guías, vales y traslados pendientes, errores de ubicación y unidad de medida."],
      ["Aprobar y registrar el ajuste", "El jefe de bodega autoriza; el ajuste lleva su motivo y respaldo."],
      ["Informar y corregir el origen", "Presente resultados y defina acciones correctivas."]
    ],
    ejemplo: "En el conteo cíclico de la clase A, un rodamiento muestra 48 en el ERP y 50 en físico. Se revisan los movimientos y aparece una guía de ingreso sin registrar. Se regulariza el documento (no se hace ajuste) y se informa al responsable.",
    controles: ["Los conteos son periódicos y programados.", "Las diferencias se investigan antes de ajustar.", "Se mide la exactitud de los registros (IRA)."],
    errores: ["Ajustar sin investigar la causa.", "Contar con movimientos abiertos.", "No dejar evidencia del conteo."],
    tips: [{ tipo: "ok", texto: "Cuente con más frecuencia los materiales clase A (alta rotación o críticos)." }]
  },
  "ajustes-bajas": {
    objetivo: "Corregir las diferencias de inventario y dar de baja material dañado, vencido u obsoleto con respaldo y autorización.",
    alcance: "Ajustes de inventario y bajas de materiales.",
    ejemplo: "Un lote de 20 filtros venció. Se levanta un acta de baja con fotos, el jefe de bodega y Contabilidad autorizan, se descarga el ERP con el motivo «vencido» y los filtros se retiran para su disposición.",
    controles: ["Todo ajuste tiene causa, aprobación y respaldo.", "Las bajas tienen acta y evidencia.", "Los residuos peligrosos van a una empresa autorizada."],
    errores: ["«Cuadrar» el sistema sin investigar.", "Dar de baja sin autorización.", "Botar residuos peligrosos como basura común."]
  },
  "trazabilidad-critica": {
    objetivo: "Poder reconstruir en cualquier momento el origen, el recorrido y el destino de los materiales críticos.",
    alcance: "Repuestos y componentes críticos o con serie, lote o vida útil.",
    ejemplo: "Mantenimiento informa que un lote de sellos presenta fallas. Gracias al registro de lote, bodega identifica en minutos cuántos quedan, dónde están y a qué equipos se entregaron.",
    controles: ["Los ítems críticos están marcados en el ERP.", "Serie, lote y vencimiento se registran al ingreso.", "Cada movimiento queda con fecha y responsable."],
    errores: ["Registrar solo la cantidad y no el lote.", "No bloquear un lote cuestionado.", "Entregar sin validar el N° de parte."]
  },
  "reposicion-stock": {
    objetivo: "Decidir cuándo y cuánto reponer para evitar quiebres de stock y sobreinventario.",
    alcance: "Ítems de consumo regular y repuestos críticos.",
    pasos: [
      ["Obtener el consumo diario", "Del historial del ERP de los últimos meses."],
      ["Conocer el plazo de entrega", "Días entre el pedido y la llegada, según el proveedor."],
      ["Definir el stock de seguridad", "Más alto para repuestos críticos o proveedores poco confiables."],
      ["Calcular el punto de reorden", "(Consumo diario × plazo de entrega) + stock de seguridad."],
      ["Alertar a Abastecimiento", "Cuando el stock llegue al punto de reorden."],
      ["Revisar anualmente", "Ajuste según cambios de consumo y de proveedor."]
    ],
    ejemplo: "Consumo diario: 4 unidades. Plazo de entrega: 10 días. Stock de seguridad: 12. Punto de reorden = (4 × 10) + 12 = 52 unidades. Al llegar a 52 se emite el pedido.",
    controles: ["Cada ítem relevante tiene punto de reorden.", "Los críticos tienen stock de seguridad definido.", "Se revisan los ítems sin movimiento."],
    errores: ["Reponer solo cuando el stock llega a cero.", "Usar el mismo stock de seguridad para todo.", "No considerar el plazo real del proveedor."]
  },
  "homologar": {
    objetivo: "Establecer una forma única y estandarizada de identificar y describir cada producto en el sistema, evitando duplicidades.",
    alcance: "Repuestos mecánicos, eléctricos e hidráulicos, herramientas, EPP, lubricantes, insumos de mantención, materiales de perforación y operación, y sustancias químicas.",
    pasos: [
      ["Recopilar información", "Catálogos, fichas técnicas, manuales, OC, guías, registros anteriores, ERP, mantenimiento y proveedores."],
      ["Revisar si el producto ya existe", "Busque por código, descripción, N° de parte, marca, modelo y características antes de crear uno nuevo."],
      ["Comparar productos similares", "Verifique técnicamente si son idénticos, por ejemplo Rodamiento 6205 SKF, SKF 6205 y 6205-2RS."],
      ["Estandarizar la descripción", "Tipo de producto + características principales + medida + marca/modelo."],
      ["Validación técnica", "En repuestos críticos, la información la valida el área técnica correspondiente."],
      ["Asignar o actualizar el código", "Use el existente, solicite uno nuevo, corrija información o regularice duplicados."],
      ["Registrar en el ERP", "De manera uniforme para todos los usuarios."],
      ["Actualizar las etiquetas", "Deben coincidir con la información homologada."]
    ],
    ejemplo: "«Filtro aceite», «Filtre de aceite» y «Oil filter» resultan ser el mismo producto (misma marca y N° de parte). Se elige «Filtro de aceite motor» como descripción estándar, se consolida el stock en un código y se actualizan las etiquetas.",
    controles: ["Código único y descripción estandarizada.", "Marca, modelo y N° de parte validados.", "Equipo asociado identificado cuando corresponde.", "Etiqueta física igual al sistema."],
    errores: ["Homologar por parecido visual.", "Crear un código nuevo sin buscar si existe.", "No validar con mantenimiento los repuestos críticos."],
    bloques: [
      { t: "Resultado esperado", lista: ["Los materiales cuentan con una identificación estandarizada, única y técnicamente validada, sin duplicidades ni descripciones diferentes.", "Cualquier trabajador autorizado puede buscar un material en el sistema y encontrar información clara y confiable: características, código, unidad de medida, ubicación y aplicación.", "En minería esto evita compras innecesarias, errores en la entrega de repuestos y apoya la continuidad operacional de los equipos."] }
    ]
  },
  "fallas-homologacion": {
    objetivo: "Tratar los errores de homologación con acciones correctivas estándar.",
    alcance: "Duplicados, descripciones incompletas, unidades incorrectas, marcas erróneas y productos mal homologados.",
    ejemplo: "Se descubre que dos filtros fueron homologados como equivalentes, pero mantenimiento determina que no son compatibles. Se bloquea temporalmente el material, se corrigen los códigos, se revisan los movimientos previos y se comunica el cambio.",
    controles: ["Toda corrección deja registro de modificación.", "Las áreas involucradas son informadas.", "Se revisan los movimientos anteriores al error."],
    errores: ["Corregir en el ERP sin avisar a mantenimiento.", "Eliminar códigos sin transferir el stock.", "No actualizar las etiquetas físicas."]
  },
  "indicadores": {
    objetivo: "Medir la calidad de la identificación y la homologación para detectar problemas y mejorar.",
    alcance: "Resultados mensuales de bodega e inventario.",
    ejemplo: "En un mes se revisaron 500 materiales y 480 estaban correctamente identificados: exactitud = 480 ÷ 500 × 100 = 96 %. Si el objetivo es 98 %, se analizan las 20 fallas para corregir su causa.",
    controles: ["Los indicadores se calculan con la misma fórmula cada mes.", "Hay metas definidas.", "Cada desviación tiene una acción correctiva."],
    errores: ["Medir solo cuando hay problemas.", "Cambiar la fórmula entre períodos.", "No actuar sobre los resultados."]
  },

  // ---------------- SEGURIDAD ----------------
  "uso-epp": {
    objetivo: "Proteger al trabajador de los riesgos de la bodega mediante el uso correcto de los elementos de protección personal.",
    alcance: "Todo el personal propio y contratista que ingrese a la bodega.",
    pasos: [
      ["Casco de seguridad", "Protege la cabeza de golpes y caída de objetos. Revise grietas y que el arnés ajuste bien."],
      ["Lentes de protección", "Protegen los ojos de partículas, polvo y salpicaduras. Sin rayas que afecten la visión."],
      ["Calzado de seguridad", "Punta reforzada y suela antideslizante. Protege de aplastamiento y resbalones."],
      ["Chaleco reflectante", "Obligatorio en zonas con tránsito de equipos: lo hace visible al operador."],
      ["Guantes según la tarea", "Anticorte para manipular piezas, resistentes a químicos para sustancias."],
      ["Protección auditiva y respiratoria", "Cuando la evaluación de riesgos lo indique."]
    ],
    ejemplo: "Un trabajador cambia un rodamiento: usa casco, lentes, calzado de seguridad y guantes anticorte. Antes de iniciar, revisa que los guantes no tengan roturas; si los tuviera, solicita reemplazo en bodega.",
    controles: ["EPP completo antes de ingresar a la zona.", "Inspección del EPP al inicio de cada turno.", "Registro de entrega firmado.", "Reposición inmediata si está dañado."],
    errores: ["Usar EPP dañado o vencido.", "Compartir EPP personal (lentes, casco).", "Quitárselo «solo un momento»."],
    tips: [{ tipo: "info", texto: "Inspeccione su EPP antes de cada turno y repórtelo si está dañado o vencido." }]
  },
  "manejo-cargas": {
    objetivo: "Prevenir lesiones por esfuerzo cumpliendo los límites legales y aplicando ayudas mecánicas y técnicas correctas.",
    alcance: "Toda tarea de levantamiento, transporte, empuje o arrastre manual de cargas.",
    ejemplo: "Un saco de 30 kg no se levanta manualmente: se usa una transpaleta o se divide la carga. Si la tarea debe hacerla una mujer o un menor de 18 años, el límite es 20 kg.",
    controles: ["Se prioriza el uso de ayudas mecánicas.", "Hay rotación del personal en tareas repetitivas.", "El personal conoce las técnicas de levantamiento."],
    errores: ["Levantar cargas pesadas «de un tirón».", "Girar el tronco con la carga en las manos.", "No pedir ayuda."]
  },
  "sustancias-peligrosas": {
    objetivo: "Manejar y almacenar sustancias peligrosas sin generar daños a personas, instalaciones o medio ambiente.",
    alcance: "Gases, líquidos inflamables, sólidos inflamables, comburentes, tóxicos, corrosivos y sustancias varias.",
    ejemplo: "En el área especial, los solventes (inflamables) quedan lejos de los ácidos y de los oxidantes. Cada envase tiene su etiqueta, la HDS está en una carpeta visible y hay un kit antiderrames junto a la puerta.",
    controles: ["HDS vigente de cada producto.", "Envases originales cerrados y etiquetados.", "Incompatibles segregados.", "Kit antiderrames, lavaojos y extintores operativos."],
    errores: ["Guardar químicos en envases sin etiqueta.", "Mezclar sustancias incompatibles.", "No reportar derrames pequeños."]
  },
  "orden-aseo": {
    objetivo: "Mantener la bodega ordenada y limpia para evitar accidentes y facilitar el trabajo.",
    alcance: "Toda la bodega y el patio techado.",
    ejemplo: "Al término del turno, el equipo retira los pallets vacíos, barre el piso, repone la demarcación gastada y deja los pasillos libres. En la mañana, la grúa transita sin obstáculos.",
    controles: ["Revisión de orden al inicio y término del turno.", "Pasillos y salidas libres.", "Demarcación y señalización vigentes."],
    errores: ["Acumular pallets vacíos en pasillos.", "No limpiar derrames de inmediato.", "Cubrir la señalización con carga."]
  },
  "emergencias": {
    objetivo: "Proteger la vida de las personas ante incendios, derrames u otras emergencias mediante una respuesta rápida y ordenada.",
    alcance: "Todo el personal en la bodega.",
    ejemplo: "Se detecta humo cerca de un tablero eléctrico. El trabajador da la alarma, corta la energía si es seguro, evacúa por la salida señalizada y se reúne en el punto de encuentro, donde el supervisor realiza el conteo.",
    controles: ["Vías de evacuación y extintores señalizados y despejados.", "Simulacros periódicos.", "El personal conoce el punto de encuentro."],
    errores: ["Intentar apagar un incendio sin capacitación.", "Volver por objetos personales.", "Bloquear las salidas de emergencia."]
  },
  "reporte-incidentes": {
    objetivo: "Registrar y analizar todo incidente para prevenir su repetición y cumplir con la normativa.",
    alcance: "Cuasi accidentes, incidentes y accidentes del trabajo.",
    ejemplo: "Un pallet se desliza del rack sin causar lesiones. El trabajador lo reporta, se investiga y se determina que el rack tenía un nivel sobrecargado. Se redistribuye la carga y se agrega señalización de capacidad.",
    controles: ["Todo hecho se reporta en el mismo turno.", "Se investiga y se definen medidas.", "El caso se cierra con verificación de las acciones."],
    errores: ["No reportar «porque no pasó nada».", "Modificar la escena antes de registrar.", "Cerrar sin implementar las medidas."]
  },
  "normativa": {
    objetivo: "Informar la normativa chilena que aplica a la bodega para facilitar su cumplimiento.",
    alcance: "Gestión de bodega, seguridad, almacenamiento de sustancias peligrosas y seguridad minera.",
    ejemplo: "Antes de recibir un nuevo producto químico, se revisa su clasificación (NCh 382), se confirma que el área especial lo permita según el DS 43/2015 y se verifica la HDS.",
    controles: ["Las normas se revisan al menos una vez al año.", "Los cambios normativos se comunican al personal.", "Se consulta el texto vigente en leychile.cl."],
    errores: ["Aplicar versiones antiguas de la norma.", "Suponer que una norma general reemplaza una específica."]
  }
});
