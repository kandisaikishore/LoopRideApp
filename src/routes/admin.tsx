import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/rp/AppShell";
import { DemoBadge } from "@/components/rp/bits";
import { ROUTES, STOPS, type ServiceAlert } from "@/lib/transit/data";
import { actions, useAppState } from "@/lib/transit/store";

type BusStatus = "Available" | "On trip" | "Maintenance";
type FleetBus = { id: string; registration: string; type: string; capacity: number; status: BusStatus };
type Driver = { id: string; name: string; licence: string; availability: "Available" | "Assigned" | "Off duty" };
type WorkOrder = { id: string; busId: string; issue: string; priority: "Low" | "Medium" | "High"; status: "Open" | "In progress" | "Closed" };

const initialFleet: FleetBus[] = [
  { id: "bus-001", registration: "TS 09 AB 1201", type: "AC city", capacity: 40, status: "Available" },
  { id: "bus-002", registration: "TS 09 AB 1202", type: "Standard", capacity: 52, status: "On trip" },
  { id: "bus-003", registration: "TS 09 AB 1203", type: "Low-floor", capacity: 36, status: "Maintenance" },
];
const initialDrivers: Driver[] = [
  { id: "drv-001", name: "Ravi Kumar", licence: "DEMO-LIC-001", availability: "Available" },
  { id: "drv-002", name: "S. Anitha", licence: "DEMO-LIC-002", availability: "Assigned" },
];

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { operatorMode, delayOverrides, disabledStops, customAlerts } = useAppState();
  const [routeId, setRouteId] = useState(ROUTES[0].id);
  const [delay, setDelay] = useState("8");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [fleet, setFleet] = useState<FleetBus[]>(initialFleet);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    { id: "wo-001", busId: "bus-003", issue: "Scheduled inspection", priority: "Medium", status: "In progress" },
  ]);
  const [registration, setRegistration] = useState("");
  const [busType, setBusType] = useState("Standard");
  const [capacity, setCapacity] = useState("40");
  const [driverName, setDriverName] = useState("");
  const [licence, setLicence] = useState("");
  const [maintenanceBus, setMaintenanceBus] = useState(initialFleet[2].id);
  const [maintenanceIssue, setMaintenanceIssue] = useState("");
  const [maintenancePriority, setMaintenancePriority] = useState<WorkOrder["priority"]>("Medium");
  const route = ROUTES.find((r) => r.id === routeId) ?? ROUTES[0];

  function addAlert(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const a: ServiceAlert = { id: "operator-demo-" + Date.now(), severity: "warning", title: title.trim().slice(0, 100), body: body.trim().slice(0, 500), routeIds: [routeId], stopIds: [], validFrom: "00:00", validTo: "23:59", source: "operator-demo" };
    actions.addAlert(a);
    setTitle("");
    setBody("");
  }

  function addBus(e: React.FormEvent) {
    e.preventDefault();
    const normalized = registration.trim().toUpperCase();
    const seats = Number(capacity);
    if (!normalized || fleet.some((b) => b.registration.toUpperCase() === normalized) || !Number.isInteger(seats) || seats < 1 || seats > 100) return;
    setFleet((current) => [...current, { id: "bus-" + Date.now(), registration: normalized, type: busType, capacity: seats, status: "Available" }]);
    setRegistration("");
    setCapacity("40");
  }

  function addDriver(e: React.FormEvent) {
    e.preventDefault();
    if (!driverName.trim() || !licence.trim() || drivers.some((d) => d.licence.toLowerCase() === licence.trim().toLowerCase())) return;
    setDrivers((current) => [...current, { id: "drv-" + Date.now(), name: driverName.trim(), licence: licence.trim(), availability: "Available" }]);
    setDriverName("");
    setLicence("");
  }

  function addWorkOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!maintenanceIssue.trim() || !maintenanceBus) return;
    setWorkOrders((current) => [...current, { id: "wo-" + Date.now(), busId: maintenanceBus, issue: maintenanceIssue.trim().slice(0, 160), priority: maintenancePriority, status: "Open" }]);
    setFleet((current) => current.map((b) => b.id === maintenanceBus ? { ...b, status: "Maintenance" } : b));
    setMaintenanceIssue("");
  }

  return <AppShell>
    <PageHeader title="Bus management console" subtitle="Demo operator workspace for fleet records, staff, maintenance and service operations." />
    <div className="mb-5"><DemoBadge label="Demo data · not production authorization" /></div>
    {!operatorMode ? <div className="rounded-xl border bg-card p-6"><h2 className="font-bold">Operator tools are disabled</h2><p className="mt-2 text-sm text-muted-foreground">Enable demo operator tools in Preferences. This flag is not production authorization.</p><Link className="mt-3 inline-block text-primary underline" to="/settings">Open preferences</Link></div> : <>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[["Fleet vehicles", String(fleet.length), "Registered demo buses"], ["Available buses", String(fleet.filter((b) => b.status === "Available").length), "Not assigned / in maintenance"], ["Open work orders", String(workOrders.filter((w) => w.status !== "Closed").length), "Maintenance items to review"]].map(([label, value, hint]) => <div key={label} className="rounded-xl border bg-card p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold tabular-nums">{value}</p><p className="mt-1 text-xs text-muted-foreground">{hint}</p></div>)}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-4">
          <h2 className="font-bold">Fleet registry</h2><p className="mt-1 text-xs text-muted-foreground">Add demo vehicle records and update their status.</p>
          <form onSubmit={addBus} className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="text-sm">Registration number<input required maxLength={20} value={registration} onChange={(e) => setRegistration(e.target.value)} placeholder="TS 09 AB 1234" className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
            <label className="text-sm">Vehicle type<select value={busType} onChange={(e) => setBusType(e.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2"><option>Standard</option><option>AC city</option><option>Low-floor</option><option>Electric</option><option>Intercity</option></select></label>
            <label className="text-sm">Seat capacity<input required type="number" min="1" max="100" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
            <div className="flex items-end"><button className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Add bus</button></div>
          </form>
          <div className="mt-4 space-y-2">{fleet.map((b) => <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"><div><p className="text-sm font-semibold">{b.registration}</p><p className="text-xs text-muted-foreground">{b.type} · {b.capacity} seats</p></div><div className="flex items-center gap-2"><span className="rounded-full bg-secondary px-2 py-1 text-xs">{b.status}</span><select aria-label={"Update status for " + b.registration} value={b.status} onChange={(e) => setFleet((current) => current.map((v) => v.id === b.id ? { ...v, status: e.target.value as BusStatus } : v))} className="rounded-md border bg-background p-1.5 text-xs"><option>Available</option><option>On trip</option><option>Maintenance</option></select></div></div>)}</div>
        </section>

        <section className="rounded-xl border bg-card p-4">
          <h2 className="font-bold">Driver directory</h2><p className="mt-1 text-xs text-muted-foreground">Maintain sample driver records and availability.</p>
          <form onSubmit={addDriver} className="mt-3 grid gap-2 sm:grid-cols-2">
            <label className="text-sm">Driver name<input required maxLength={100} value={driverName} onChange={(e) => setDriverName(e.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
            <label className="text-sm">Demo licence reference<input required maxLength={40} value={licence} onChange={(e) => setLicence(e.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
            <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground sm:col-span-2">Add driver</button>
          </form>
          <div className="mt-4 space-y-2">{drivers.map((d) => <div key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"><div><p className="text-sm font-semibold">{d.name}</p><p className="text-xs text-muted-foreground">{d.licence}</p></div><select aria-label={"Update availability for " + d.name} value={d.availability} onChange={(e) => setDrivers((current) => current.map((v) => v.id === d.id ? { ...v, availability: e.target.value as Driver["availability"] } : v))} className="rounded-md border bg-background p-1.5 text-xs"><option>Available</option><option>Assigned</option><option>Off duty</option></select></div>)}</div>
        </section>

        <section className="rounded-xl border bg-card p-4">
          <h2 className="font-bold">Maintenance work orders</h2><p className="mt-1 text-xs text-muted-foreground">Opening a work order moves the selected demo bus to Maintenance status.</p>
          <form onSubmit={addWorkOrder} className="mt-3 space-y-3">
            <label className="block text-sm">Bus<select value={maintenanceBus} onChange={(e) => setMaintenanceBus(e.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2">{fleet.map((b) => <option key={b.id} value={b.id}>{b.registration}</option>)}</select></label>
            <label className="block text-sm">Issue / inspection<input required maxLength={160} value={maintenanceIssue} onChange={(e) => setMaintenanceIssue(e.target.value)} placeholder="Brake inspection" className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
            <label className="block text-sm">Priority<select value={maintenancePriority} onChange={(e) => setMaintenancePriority(e.target.value as WorkOrder["priority"])} className="mt-1 block w-full rounded-lg border bg-background p-2"><option>Low</option><option>Medium</option><option>High</option></select></label>
            <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Create work order</button>
          </form>
          <div className="mt-4 space-y-2">{workOrders.map((w) => <div key={w.id} className="rounded-lg border p-3"><div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-semibold">{fleet.find((b) => b.id === w.busId)?.registration ?? w.busId}</p><span className="text-xs">{w.priority} priority</span></div><p className="mt-1 text-sm">{w.issue}</p><div className="mt-2 flex items-center justify-between gap-2"><span className="text-xs text-muted-foreground">{w.status}</span><select aria-label={"Update work order status " + w.id} value={w.status} onChange={(e) => { const status = e.target.value as WorkOrder["status"]; setWorkOrders((current) => current.map((v) => v.id === w.id ? { ...v, status } : v)); if (status === "Closed") setFleet((current) => current.map((b) => b.id === w.busId ? { ...b, status: "Available" } : b)); }} className="rounded-md border bg-background p-1.5 text-xs"><option>Open</option><option>In progress</option><option>Closed</option></select></div></div>)}</div>
        </section>

        <section className="rounded-xl border bg-card p-4">
          <h2 className="font-bold">Simulated dispatch controls</h2><p className="mt-1 text-xs text-muted-foreground">These controls affect only local demo state, never actual buses.</p>
          <label className="mt-3 block text-sm">Route<select className="mt-1 block w-full rounded-lg border bg-background p-2" value={routeId} onChange={(e) => setRouteId(e.target.value)}>{ROUTES.map((r) => <option key={r.id} value={r.id}>{r.shortName} — {r.name}</option>)}</select></label>
          <label className="mt-3 block text-sm">Delay minutes<input className="mt-1 block w-full rounded-lg border bg-background p-2" type="number" min="0" max="180" value={delay} onChange={(e) => setDelay(e.target.value)} /></label>
          <div className="mt-3 flex gap-2"><button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground" onClick={() => actions.setDelay(routeId, Math.min(180, Math.max(0, Number(delay) || 0)))}>Apply demo delay</button><button className="rounded-lg border px-3 py-2 text-sm" onClick={() => actions.setDelay(routeId, null)}>Clear</button></div>
          <p className="mt-2 text-xs text-muted-foreground">Current override: {delayOverrides[routeId] == null ? "none" : delayOverrides[routeId] + " minutes"}.</p>
          <h3 className="mt-5 font-semibold">Stop availability</h3><ul className="mt-2 space-y-2">{route.stops.map((rs) => { const stop = STOPS.find((s) => s.id === rs.stopId)!; const key = route.id + ":" + stop.id; return <li key={key} className="flex items-center justify-between gap-3 rounded-lg border p-3"><span className="text-sm">{stop.name}<span className="block text-xs text-muted-foreground">{rs.pickup ? "Pickup " : ""}{rs.drop ? "Drop" : ""}</span></span><button aria-pressed={!!disabledStops[key]} onClick={() => actions.toggleStop(key)} className="rounded-md border px-3 py-1.5 text-xs font-semibold">{disabledStops[key] ? "Disabled · enable" : "Enabled · disable"}</button></li>; })}</ul>
        </section>

        <section className="rounded-xl border bg-card p-4 lg:col-span-2">
          <h2 className="font-bold">Create demo service alert</h2><form className="mt-3 grid gap-3 md:grid-cols-[1fr_2fr_auto]" onSubmit={addAlert}><label className="block text-sm">Alert title<input required maxLength={100} className="mt-1 block w-full rounded-lg border bg-background p-2" value={title} onChange={(e) => setTitle(e.target.value)} /></label><label className="block text-sm">Details<textarea required maxLength={500} rows={2} className="mt-1 block w-full rounded-lg border bg-background p-2" value={body} onChange={(e) => setBody(e.target.value)} /></label><button className="self-end rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Add alert</button></form><p className="mt-3 text-xs text-muted-foreground">{customAlerts.length} locally saved operator-demo alerts.</p>
        </section>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">Demo records are stored in component state and reset on refresh. Production deployment requires server-side identity/roles, persistent storage, transaction-safe dispatch and audit logs.</p>
    </>}
  </AppShell>;
}
