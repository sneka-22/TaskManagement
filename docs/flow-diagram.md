# Task Management flow diagram

This document provides visual flow diagrams for the main processes and data flows in the Product Badges module.
 
---
 
**Note:** These diagrams use [Mermaid](https://mermaid-js.github.io/) syntax. You can preview them in supported Markdown editors,online Mermaid live editors or install https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid

```mermaid
flowchart TD
    %% Client Layer
    A["Client"] --> B["POST /auth/login"]
    B --> C["Auth Route<br/>routes/auth.routes.ts"]
    C --> D["Validation Middleware"]
    D --> E["Auth Controller"]
    E --> F["Auth Service"]
    F --> G["DB: Find User"]
    G --> H{"User Found?"}
    H -- "No" --> I["401 Unauthorized"]
    I -.-> A
    H -- "Yes" --> J["Compare Password"]
    J --> K{"Password Match?"}
    K -- "No" --> I
    K -- "Yes" --> L["Generate JWT"]
    L --> M["200 OK: Token"]
    M --> N["Client"]

    %% Task Creation
    N --> O["POST /tasks"]
    O --> P["Task Route<br/>routes/task.routes.ts"]
    P --> Q["Auth Middleware"]
    Q --> R{"Token Valid?"}
    R -- "No" --> S["401 Unauthorized"]
    S -.-> N
    R -- "Yes" --> T["Validation Middleware"]
    T --> U["Task Controller"]
    U --> V["Task Service"]
    V --> W["DB: Insert Task"]
    W --> X{"Insert Success?"}
    X -- "No" --> Y["500 Server Error"]
    Y -.-> N
    X -- "Yes" --> Z["201 Created: Task"]
    Z --> N

    classDef errorStyle fill:#ffffff,stroke:#ff0000,stroke-width:2px
    class I,S,Y errorStyle
```