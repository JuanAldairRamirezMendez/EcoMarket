name: Tarea / Feature
about: Tarea de desarrollo ligada al cronograma
title: "[FEAT] {breve-descripción}"
labels: enhancement
assignees: 
body:
  - type: markdown
    attributes:
      value: |
        ## Descripción
        (Qué se debe hacer)

  - type: textarea
    id: acceptance_criteria
    attributes:
      label: Criterios de aceptación
      description: Qué debe cumplirse para considerar la tarea como completa

  - type: checkbox
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: Crear branch y PR
        - label: Implementación backend
        - label: Implementación frontend
        - label: Tests unitarios / e2e
        - label: Documentación
