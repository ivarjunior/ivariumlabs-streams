const streamChannels = [
  {name: 'RTV Stad FM', type: 'Radio simulcast', status: 'Live', output: 'Icecast + HLS'},
  {name: 'RTV Stad TV', type: 'TV lokaal kanaal', status: 'Live', output: 'HLS + confidence'},
  {name: 'Gemeenteraad', type: 'Event feed', status: 'Stand-by', output: 'RTMP ingest'},
]

const ingestRows = [
  {label: 'Studio A program', source: 'SDI/NDI ingest', state: 'Locked'},
  {label: 'Radio mixer main', source: 'Icecast relay', state: 'Healthy'},
  {label: 'Field reporter kit', source: 'RTMP contribution', state: 'Waiting'},
]

const outputRows = [
  {label: 'Website livestream', type: 'HLS primary', state: 'Published'},
  {label: 'Cable head-end', type: 'Confidence output', state: 'Online'},
  {label: 'Broadcast automation', type: 'Internal handoff', state: 'Ready'},
]

const incidentRows = [
  {time: '07:48', title: 'Studio A recovered after packet loss', severity: 'Resolved'},
  {time: '08:15', title: 'Remote contribution requested for city hall', severity: 'Open'},
  {time: '08:42', title: 'Backup audio bed switched on council channel', severity: 'Monitoring'},
]

function StatusPill({label, tone}: {label: string; tone: 'green' | 'amber' | 'blue'}) {
  const toneClass =
    tone === 'green'
      ? 'bg-emerald-400/15 text-emerald-200 border-emerald-300/20'
      : tone === 'amber'
      ? 'bg-amber-400/15 text-amber-200 border-amber-300/20'
      : 'bg-sky-400/15 text-sky-200 border-sky-300/20'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}>{label}</span>
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#16396a_0%,#08111f_45%,#050913_100%)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-6 md:px-8 md:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-2xl shadow-black/25 backdrop-blur md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                IvariumLabs Streams
              </span>
              <StatusPill label="3 actieve kanalen" tone="green" />
            </div>
            <div className="mt-6 max-w-4xl space-y-5">
              <h1 className="text-5xl font-semibold leading-none text-[var(--foreground)] md:text-7xl">
                Radio- en tv-feeds opzetten, bewaken en doorzetten.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
                Deze streams-workspace is de operationele laag voor lokale omroepen: studio ingest, remote bijdragen,
                confidence outputs en distributie naar website, interne broadcast automation en playout.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Live ingest</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">5</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Bronnen gelocked</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Outputs</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">9</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Publicatiepaden actief</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Open issues</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--foreground)]">1</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Operator aandacht nodig</p>
              </div>
            </div>
          </article>

          <article className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/25 backdrop-blur md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Kanaaloverzicht</h2>
            <div className="mt-5 space-y-3">
              {streamChannels.map((channel, index) => (
                <div key={channel.name} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Kanaal {index + 1}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{channel.name}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{channel.type}</p>
                    </div>
                    <StatusPill label={channel.status} tone={channel.status === 'Live' ? 'green' : 'amber'} />
                  </div>
                  <p className="mt-4 text-sm text-[var(--muted)]">Output: {channel.output}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article id="ingest" className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Ingest lanes</h2>
              <StatusPill label="2 live / 1 stand-by" tone="blue" />
            </div>
            <div className="mt-5 space-y-3">
              {ingestRows.map((row) => (
                <div key={row.label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{row.label}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{row.source}</p>
                    </div>
                    <StatusPill
                      label={row.state}
                      tone={row.state === 'Healthy' || row.state === 'Locked' ? 'green' : row.state === 'Waiting' ? 'amber' : 'blue'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article id="outputs" className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Output distribution</h2>
              <StatusPill label="All routes healthy" tone="green" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {outputRows.map((row) => (
                <div key={row.label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{row.type}</p>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">{row.label}</h3>
                  <p className="mt-4 text-sm text-[var(--muted)]">{row.state}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="monitoring" className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Monitoring & incidenten</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Combineer ingest health, operator-notities en incident logging voor radio en televisie in een centrale feed.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]"
            >
              Nieuwe operator note
            </a>
          </div>
          <div className="mt-6 grid gap-3">
            {incidentRows.map((incident) => (
              <div key={`${incident.time}-${incident.title}`} className="grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 md:grid-cols-[88px_1fr_auto] md:items-center">
                <p className="text-sm font-semibold text-[var(--foreground)]">{incident.time}</p>
                <p className="text-sm text-[var(--muted)]">{incident.title}</p>
                <StatusPill
                  label={incident.severity}
                  tone={incident.severity === 'Resolved' ? 'green' : incident.severity === 'Open' ? 'amber' : 'blue'}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
