# AEGIX Information Architecture

**Version 1.0 — Founding Document**
**Status: Permanent reference. All navigation, page structure, and information hierarchy must conform to this document.**

---

## 0. Purpose of This Document

This document defines the complete information architecture for AEGIX — the navigation hierarchy, page structure, and data relationships that organize the platform. It serves as the blueprint for how hundreds of pages will be structured, how users will navigate between them, and how information will scale as the platform grows.

AEGIX is an **Enterprise Asset Protection Platform** — an operating environment for professional IT teams. The information architecture must support:
- Extended usage sessions (8+ hours daily)
- Rapid information retrieval
- Clear task completion paths
- Scalable growth to hundreds of pages

---

## 1. Navigation Hierarchy

### 1.1 Primary Navigation Structure

```
AEGIX
├── Overview
├── Assets
│   ├── All Assets
│   ├── Devices
│   ├── Tracking
│   └── Asset Detail (dynamic)
├── Policies
│   ├── All Policies
│   ├── Policy Editor
│   └── Policy Detail (dynamic)
├── Incidents
│   ├── All Incidents
│   ├── Incident Detail (dynamic)
│   └── Response Actions
├── Threat Intelligence
│   ├── Feeds
│   ├── Indicators
│   └── Intelligence Detail (dynamic)
├── Threat Hunting
│   ├── Queries
│   ├── Hunt Results
│   └── Investigation Workspace
├── Compliance
│   ├── Reports
│   ├── Controls
│   └── Audit Trail
├── Reports
│   ├── Scheduled
│   ├── Ad-hoc
│   └── Report Builder
├── Administration
│   ├── Users
│   ├── Roles
│   ├── Integrations
│   └── System Status
└── Settings
    ├── Profile
    ├── Preferences
    ├── Workspaces
    └── API Keys
```

### 1.2 Navigation Principles

- **Persistent sidebar:** Primary navigation always visible on left
- **No mega-menus:** Each item expands to one level of children
- **Breadcrumbs:** Show current location and path back
- **Search-first:** Global search available at all times
- **No hidden navigation:** All pages reachable through navigation

---

## 2. Overview Module

### 2.1 Purpose

The Overview module provides a high-level operational dashboard for daily monitoring and quick access to critical information. It is the default landing page after login.

### 2.2 Responsibilities

- Display system health at a glance
- Show critical alerts requiring attention
- Provide quick links to active incidents
- Display asset coverage metrics
- Show compliance status summary

### 2.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Dashboard | `/app/overview` | Main overview with widgets |
| System Health | `/app/overview/health` | Detailed system status |
| Quick Actions | `/app/overview/actions` | Common operational tasks |

### 2.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** System Health, Quick Actions
- **Siblings:** All other top-level modules
- **Cross-links:** Links to active incidents, critical assets

### 2.5 Expected Data

- Asset count and status distribution
- Active incident count and severity
- Policy compliance percentage
- System uptime and performance
- Recent activity feed

### 2.6 Future Expansion

- Custom widget configuration
- Role-based overview variations
- Exportable dashboard views
- Integration with external dashboards

---

## 3. Assets Module

### 3.1 Purpose

The Assets module is the core inventory system for all protected assets — servers, workstations, mobile devices, cloud resources, and network equipment.

### 3.2 Responsibilities

- Maintain complete asset inventory
- Track asset lifecycle and status
- Provide asset search and filtering
- Enable bulk asset operations
- Show asset relationships and dependencies

### 3.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| All Assets | `/app/assets` | Main asset table view |
| Devices | `/app/assets/devices` | Device-specific view |
| Tracking | `/app/assets/tracking` | Asset location and movement |
| Asset Detail | `/app/assets/:assetId` | Individual asset view |
| Asset History | `/app/assets/:assetId/history` | Change history |
| Asset Relationships | `/app/assets/:assetId/relationships` | Dependency mapping |

### 3.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Devices, Tracking, Asset Detail (dynamic)
- **Siblings:** All other top-level modules
- **Cross-links:** From incidents, policies, compliance

### 3.5 Expected Data

- Asset ID, name, type, status
- Last seen timestamp
- Assigned policies
- Current vulnerabilities
- Location and network info
- Ownership and contact

### 3.6 Future Expansion

- Asset grouping and tagging
- Custom asset attributes
- Asset import/export
- Asset lifecycle workflows
- Integration with CMDB systems

---

## 4. Devices Module

### 4.1 Purpose

The Devices module provides specialized views and operations for endpoint devices — workstations, servers, mobile devices, and IoT equipment.

### 4.2 Responsibilities

- Device enrollment and provisioning
- Device health monitoring
- Device configuration management
- Device compliance status
- Device remote actions

### 4.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Device Inventory | `/app/assets/devices` | Device list and filters |
| Device Enrollment | `/app/assets/devices/enroll` | Add new devices |
| Device Groups | `/app/assets/devices/groups` | Group management |
| Device Detail | `/app/assets/devices/:deviceId` | Individual device |
| Device Actions | `/app/assets/devices/:deviceId/actions` | Remote operations |

### 4.4 Navigation Relationships

- **Parent:** Assets
- **Children:** Device Groups, Device Detail (dynamic)
- **Siblings:** Tracking, All Assets
- **Cross-links:** From incidents, policies

### 4.5 Expected Data

- Device ID, serial number, model
- OS version and patch level
- Agent status and version
- Network configuration
- Installed software
- Security posture

### 4.6 Future Expansion

- Device lifecycle automation
- Hardware inventory integration
- Device replacement workflows
- Mobile device management
- IoT device support

---

## 5. Tracking Module

### 5.1 Purpose

The Tracking module monitors asset location, network presence, and movement patterns for security and compliance purposes.

### 5.2 Responsibilities

- Real-time asset location tracking
- Network presence monitoring
- Asset movement history
- Geofencing and boundary alerts
- Tracking policy enforcement

### 5.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Location Tracking | `/app/assets/tracking` | Map view and list |
| Network Presence | `/app/assets/tracking/network` | Network activity |
| Movement History | `/app/assets/tracking/history` | Timeline view |
| Geofences | `/app/assets/tracking/geofences` | Boundary management |
| Tracking Rules | `/app/assets/tracking/rules` | Policy configuration |

### 5.4 Navigation Relationships

- **Parent:** Assets
- **Children:** Geofences, Tracking Rules
- **Siblings:** Devices, All Assets
- **Cross-links:** From incidents, compliance

### 5.5 Expected Data

- GPS coordinates and accuracy
- Network connection history
- Access point associations
- Geofence violations
- Tracking policy status

### 5.6 Future Expansion

- Real-time location streaming
- Predictive movement analysis
- Integration with physical security
- Asset recovery workflows
- Privacy controls and opt-out

---

## 6. Incidents Module

### 6.1 Purpose

The Incidents module manages security and compliance incidents from detection through resolution and post-incident review.

### 6.2 Responsibilities

- Incident detection and triage
- Incident assignment and tracking
- Response action coordination
- Incident documentation
- Post-incident analysis

### 6.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| All Incidents | `/app/incidents` | Incident list and filters |
| Incident Detail | `/app/incidents/:incidentId` | Individual incident |
| Response Actions | `/app/incidents/:incidentId/actions` | Remediation tasks |
| Evidence | `/app/incidents/:incidentId/evidence` | Collected data |
| Timeline | `/app/incidents/:incidentId/timeline` | Event sequence |
| Notes | `/app/incidents/:incidentId/notes` | Analyst notes |

### 6.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Incident Detail (dynamic)
- **Siblings:** All other top-level modules
- **Cross-links:** From assets, policies, threat intelligence

### 6.5 Expected Data

- Incident ID, severity, status
- Affected assets and scope
- Detection source and time
- Assigned analysts
- Response actions taken
- Resolution status

### 6.6 Future Expansion

- Incident playbooks and automation
- Multi-tenant incident sharing
- External incident integration
- Compliance reporting linkage
- Incident metrics and analytics

---

## 7. Threat Intelligence Module

### 7.1 Purpose

The Threat Intelligence module manages threat feeds, indicators of compromise, and intelligence correlation for proactive protection.

### 7.2 Responsibilities

- Threat feed management
- Indicator of compromise (IOC) tracking
- Intelligence correlation
- False positive management
- Threat source credibility

### 7.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Feeds | `/app/threat-intelligence/feeds` | Feed management |
| Indicators | `/app/threat-intelligence/indicators` | IOC list and search |
| Intelligence Detail | `/app/threat-intelligence/indicators/:indicatorId` | IOC details |
| Correlations | `/app/threat-intelligence/correlations` | Matched events |
| Sources | `/app/threat-intelligence/sources` | Source management |
| Confidence | `/app/threat-intelligence/confidence` | Scoring rules |

### 7.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Correlations, Sources, Confidence
- **Siblings:** All other top-level modules
- **Cross-links:** From hunting, incidents, assets

### 7.5 Expected Data

- IOC value, type, threat type
- Feed source and credibility
- First/last seen timestamps
- Matched assets and events
- False positive count
- Expiration date

### 7.6 Future Expansion

- Automated feed ingestion
- Custom indicator types
- Threat intelligence sharing
- Integration with TIP platforms
- Predictive threat scoring

---

## 8. Threat Hunting Module

### 8.1 Purpose

The Threat Hunting module enables proactive security investigation through query building, result analysis, and investigation workflows.

### 8.2 Responsibilities

- Query builder for data exploration
- Hunt result analysis
- Investigation workspace
- Evidence collection
- Hunt scheduling

### 8.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Queries | `/app/hunting/queries` | Saved query library |
| Query Builder | `/app/hunting/queries/builder` | Interactive query tool |
| Hunt Results | `/app/hunting/results` | Query output |
| Investigation | `/app/hunting/investigation` | Deep analysis workspace |
| Scheduled Hunts | `/app/hunting/scheduled` | Automated queries |
| Hunt History | `/app/hunting/history` | Past hunt results |

### 8.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Investigation, Scheduled Hunts
- **Siblings:** All other top-level modules
- **Cross-links:** From threat intelligence, incidents

### 8.5 Expected Data

- Query definition and syntax
- Result count and preview
- Execution time and status
- Investigator notes
- Evidence references
- Related incidents

### 8.6 Future Expansion

- Query templates and sharing
- Collaborative investigation
- Automated hunt suggestions
- Integration with SIEM
- Machine learning assistance

---

## 9. Compliance Module

### 9.1 Purpose

The Compliance module tracks regulatory and policy compliance across all protected assets and generates audit-ready reports.

### 9.2 Responsibilities

- Compliance framework management
- Control implementation tracking
- Audit trail generation
- Compliance reporting
- Evidence collection

### 9.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Reports | `/app/compliance/reports` | Compliance reports |
| Controls | `/app/compliance/controls` | Control library |
| Frameworks | `/app/compliance/frameworks` | Standard frameworks |
| Audit Trail | `/app/compliance/audit` | Activity log |
| Evidence | `/app/compliance/evidence` | Compliance evidence |
| Assessments | `/app/compliance/assessments` | Manual assessments |

### 9.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Frameworks, Assessments
- **Siblings:** All other top-level modules
- **Cross-links:** From assets, policies, reports

### 9.5 Expected Data

- Framework name and version
- Control ID and description
- Implementation status
- Evidence references
- Assessment dates
- Compliance score

### 9.6 Future Expansion

- Custom framework creation
- Automated control testing
- Continuous compliance monitoring
- External audit integration
- Compliance workflow automation

---

## 10. Reports Module

### 10.1 Purpose

The Reports module provides scheduled and ad-hoc reporting capabilities for operational metrics, compliance, and executive summaries.

### 10.2 Responsibilities

- Report template management
- Scheduled report configuration
- Ad-hoc report generation
- Report distribution
- Report history and archives

### 10.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Scheduled | `/app/reports/scheduled` | Recurring reports |
| Ad-hoc | `/app/reports/adhoc` | On-demand reports |
| Report Builder | `/app/reports/builder` | Report creation |
| Templates | `/app/reports/templates` | Template library |
| Archives | `/app/reports/archives` | Past reports |
| Distribution | `/app/reports/distribution` | Sharing settings |

### 10.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** Templates, Archives
- **Siblings:** All other top-level modules
- **Cross-links:** From compliance, incidents, overview

### 10.5 Expected Data

- Report name and description
- Schedule and recipients
- Report format and content
- Generation status
- Archive date
- Access permissions

### 10.6 Future Expansion

- Custom report builder
- Report visualization options
- External system integration
- Report versioning
- Automated distribution

---

## 11. Administration Module

### 11.1 Purpose

The Administration module manages system configuration, user access, integrations, and overall platform health.

### 11.2 Responsibilities

- User and role management
- System configuration
- Integration management
- System monitoring
- Backup and recovery

### 11.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Users | `/app/administration/users` | User management |
| Roles | `/app/administration/roles` | Role and permission |
| Integrations | `/app/administration/integrations` | External systems |
| System Status | `/app/administration/status` | Platform health |
| Logs | `/app/administration/logs` | System logs |
| Backup | `/app/administration/backup` | Data protection |

### 11.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** None (all pages are siblings)
- **Siblings:** All other top-level modules
- **Cross-links:** From settings, system health

### 11.5 Expected Data

- User accounts and status
- Role definitions and permissions
- Integration connection status
- System performance metrics
- Log entries and levels
- Backup status and history

### 11.6 Future Expansion

- Multi-tenant administration
- Audit log export
- Integration marketplace
- System automation
- Disaster recovery workflows

---

## 12. Settings Module

### 12.1 Purpose

The Settings module provides user and workspace configuration for personalizing the AEGIX experience.

### 12.2 Responsibilities

- User profile management
- UI preferences
- Workspace configuration
- API key management
- Notification settings

### 12.3 Child Pages

| Page | Path | Purpose |
|---|---|---|
| Profile | `/app/settings/profile` | User information |
| Preferences | `/app/settings/preferences` | UI and behavior |
| Workspaces | `/app/settings/workspaces` | Workspace management |
| API Keys | `/app/settings/api-keys` | API access |
| Notifications | `/app/settings/notifications` | Alert preferences |
| Security | `/app/settings/security` | Authentication |

### 12.4 Navigation Relationships

- **Parent:** None (top-level)
- **Children:** None (all pages are siblings)
- **Siblings:** All other top-level modules
- **Cross-links:** From user menu, administration

### 12.5 Expected Data

- User profile and contact
- Theme and layout preferences
- Workspace configurations
- API key names and scopes
- Notification channels
- Security settings

### 12.6 Future Expansion

- Custom theme creation
- Workspace templates
- SSO integration
- Two-factor authentication
- Session management

---

## 13. Scalability Framework

### 13.1 Navigation Scaling

- **Lazy-loaded routes:** Each module loads independently
- **Dynamic routes:** Asset and incident detail pages are parameterized
- **Search-first navigation:** Global search reduces menu depth
- **Keyboard shortcuts:** Power users navigate without mouse

### 13.2 Information Scaling

- **Pagination:** All lists are paginated
- **Virtual scrolling:** Large datasets render efficiently
- **Progressive disclosure:** Details revealed on demand
- **Filter persistence:** User filters saved in workspace

### 13.3 Future Module Integration

The architecture supports adding new modules without restructuring:

```
/app/
├── [new-module]/
│   ├── index.tsx
│   ├── routes/
│   └── components/
```

---

## 14. The One-Sentence Test

Before adding any new page, section, or navigation item, ask:

> "Does this make AEGIX feel like a more precise, trustworthy operating environment — or does it make it feel like a dashboard someone tried to make look impressive?"

If it is the latter, it does not ship as designed. The Design Constitution and this Information Architecture document are the standing authority for that decision.