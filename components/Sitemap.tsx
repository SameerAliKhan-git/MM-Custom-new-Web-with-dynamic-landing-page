import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

// Helper to create simple kebab-case routes for group titles
function toSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[|]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

type Item = { label: string; href: string; children?: Item[] }
type Group = { title: string; items: Item[] }

const groups: Group[] = [
  {
    title: "Who we are",
    items: [
      { label: "About us", href: "/about" },
      { label: "Vision | Mission | Values", href: "/vision-mission-values" },
      { label: "Our governance", href: "/governance" },
      { label: "Financial information", href: "/financials" },
    ],
  },
  {
    title: "Our work",
    items: [
      { label: "Our programmes", href: "/programmes" },
      { label: "Where we work", href: "/locations" },
      { label: "Government partnerships/scheme", href: "/partnerships" },
      { label: "Child safeguarding", href: "/safeguarding" },
      { label: "Stories of change", href: "/stories-change" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Sponsor a child",
    items: [
      { label: "Sponsor a child (INR 11,880 / year)", href: "/sponsor" },
      { label: "Sponsor education (INR 28,200 / year)", href: "/sponsor#education" },
    ],
  },
  {
    title: "Donor portal",
    items: [],
  },
  {
    title: "Ways to give",
    items: [
      { label: "Partnerships", href: "/partnerships" },
      { label: "Philanthropy", href: "/philanthropy" },
      { label: "Give in celebration", href: "/give-celebration" },
      { label: "School buddy programme", href: "/school-buddy" },
      { label: "Make a donation", href: "/donate" },
      {
        label: "Other ways to give",
        href: "/other-ways",
        children: [
          { label: "Internship", href: "/internship" },
          { label: "Legacy", href: "/legacy" },
          { label: "Payroll giving", href: "/payroll-giving" },
          { label: "Employee engagement", href: "/employee-engagement" },
          { label: "CRM", href: "/crm" },
          { label: "Give in memory", href: "/memory" },
        ],
      },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Annual Report", href: "/reports" },
      { label: "Blog", href: "/blog" },
      { label: "Media", href: "/media" },
    ],
  },
]

function Pill({ children, href }: { children: React.ReactNode; href?: string }) {
  return (
    href ? (
      <a
        href={href}
        className="rounded-md border border-primary bg-primary text-primary-foreground shadow-sm px-4 py-2 text-sm font-medium transition-all duration-200 hover:brightness-95 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {children}
      </a>
    ) : (
      <div className="rounded-md border border-primary bg-primary text-primary-foreground shadow-sm px-4 py-2 text-sm font-medium transition-all duration-200 hover:brightness-95 hover:shadow-md focus:outline-none">
        {children}
      </div>
    )
  )
}

function CardLink({ item }: { item: Item }) {
  return (
    <a
      href={item.href}
      className="inline-block rounded-md border border-primary/60 bg-white text-[#0a0a0a] shadow-sm px-3 py-2 text-sm transition-all duration-200 hover:shadow-md hover:border-primary hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      {item.label}
    </a>
  )
}

function GroupColumn({ group }: { group: Group }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pillRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const firstRef = useRef<HTMLDivElement | null>(null)
  const lastRef = useRef<HTMLDivElement | null>(null)
  // Refs for a single nested sub-branch (used for "Other ways to give")
  const nestedContainerRef = useRef<HTMLDivElement | null>(null)
  const nestedFirstRef = useRef<HTMLDivElement | null>(null)
  const nestedLastRef = useRef<HTMLDivElement | null>(null)
  const nestedParentRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState({
    railTop: 0,
    railBottom: 0,
    railX: 0,
    parentX: 0,
    parentLeftX: 0,
    parentBottomY: 0,
    firstMidY: 0,
    nestedX: 0,
    nestedTop: 0,
    nestedBottom: 0,
    nestedParentLeftX: 0,
    nestedParentBottomY: 0,
    nestedParentMidY: 0,
  })

  const recalc = () => {
    const containerEl = containerRef.current
    const pillEl = pillRef.current
    const listEl = listRef.current
    const firstEl = firstRef.current
  const lastEl = lastRef.current
  if (!containerEl || !pillEl || !listEl || !firstEl || !lastEl) return
  const containerRect = containerEl.getBoundingClientRect()
  const pillRect = pillEl.getBoundingClientRect()
  const listRect = listEl.getBoundingClientRect()
    const firstRect = firstEl.getBoundingClientRect()
    const lastRect = lastEl.getBoundingClientRect()

  // Compute child midlines
  const firstMidYRaw = firstRect.top + firstRect.height / 2 - containerRect.top
  const lastMidYRaw = lastRect.top + lastRect.height / 2 - containerRect.top
  // Snap to integer pixels for crisp edges
  const firstMidY = Math.round(firstMidYRaw)
  const lastMidY = Math.round(lastMidYRaw)
  const railTop = Math.min(firstMidY, lastMidY)
  const railBottom = Math.max(firstMidY, lastMidY)

  // Branch should originate from the leftmost point of the parent pill
  // For red top tap, center of pill
  const parentX = Math.round(pillRect.left + pillRect.width / 2 - containerRect.left)
  // For blue branching, left edge of pill (snap to even px to keep 2px stroke crisp and consistent)
  let parentLeftX = Math.round(pillRect.left - containerRect.left)
  if (parentLeftX % 2 !== 0) parentLeftX += 1
  // Rail aligns with the left padding edge of the list container
  const padLeft = parseFloat(getComputedStyle(listEl).paddingLeft || "0")
  let railX = Math.round(listRect.left - containerRect.left + padLeft)
  if (railX % 2 !== 0) railX += 1
    const parentBottomY = Math.round(pillRect.bottom - containerRect.top)

  // Compute nested sub-branch coordinates if present
  const nestedEl = nestedContainerRef.current
  const nestedFirstEl = nestedFirstRef.current
  const nestedLastEl = nestedLastRef.current
  const nestedParentEl = nestedParentRef.current
  let nestedX = 0
  let nestedTop = 0
  let nestedBottom = 0
  let nestedParentLeftX = 0
  let nestedParentBottomY = 0
  let nestedParentMidY = 0
  if (nestedEl && nestedFirstEl && nestedLastEl) {
    const nRect = nestedEl.getBoundingClientRect()
    const nFirstRect = nestedFirstEl.getBoundingClientRect()
    const nLastRect = nestedLastEl.getBoundingClientRect()
    // Align nested vertical rail with the left edge of nested child connectors (account for padding-left)
    const nPadLeft = parseFloat(getComputedStyle(nestedEl).paddingLeft || "0")
    nestedX = Math.round(nRect.left - containerRect.left + nPadLeft)
    if (nestedX % 2 !== 0) nestedX += 1
    const nFirstMid = Math.round(nFirstRect.top + nFirstRect.height / 2 - containerRect.top)
    const nLastMid = Math.round(nLastRect.top + nLastRect.height / 2 - containerRect.top)
    nestedTop = Math.min(nFirstMid, nLastMid)
    nestedBottom = Math.max(nFirstMid, nLastMid)
  }
  if (nestedParentEl) {
    const npRect = nestedParentEl.getBoundingClientRect()
    nestedParentLeftX = Math.round(npRect.left - containerRect.left)
    if (nestedParentLeftX % 2 !== 0) nestedParentLeftX += 1
    nestedParentBottomY = Math.round(npRect.bottom - containerRect.top) - 1
    nestedParentMidY = Math.round(npRect.top + npRect.height / 2 - containerRect.top)
  }

  setCoords({ railTop, railBottom, railX, parentX, parentLeftX, parentBottomY, firstMidY, nestedX, nestedTop, nestedBottom, nestedParentLeftX, nestedParentBottomY, nestedParentMidY })
  }

  useLayoutEffect(() => {
    recalc()
    // Recalc after fonts/images load as sizes may change
    const t = setTimeout(recalc, 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onResize = () => recalc()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <div ref={pillRef} className="relative inline-block z-10">
        {/* Blue tap from top horizontal into CENTER of parent pill */}
  <div className="absolute -top-6 left-1/2 -translate-x-[1px] h-6 w-[2px] bg-primary" />
        <Pill href={`/${toSlug(group.title)}`}>{group.title}</Pill>
      </div>
      {group.items.length > 0 && (
        <>
          {/* List with computed side rail and connectors */}
          <div
            ref={listRef}
            className={`relative mt-6 md:mt-8 z-10 ${
              group.title === "Our work"
                ? "pl-8"
                : group.title === "Sponsor a child"
                ? "-ml-6 pl-6"
                : "pl-4"
            }`}
          >
            <div className="flex flex-col gap-5 md:gap-6">
              {group.items.map((it, i) => (
                <div
                  key={it.href}
                  ref={i === 0 ? firstRef : i === group.items.length - 1 ? lastRef : undefined}
                  className="relative"
                >
                  {/* Rail -> card connector on each child midline */}
                  {!((it.children && it.children.length > 0)) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-primary" />
                  )}
                  <div className="ml-4 inline-block" ref={it.children && it.children.length > 0 ? nestedParentRef : undefined}>
                    <CardLink item={it} />
                  </div>

                  {/* Nested sub-branches (e.g., Other ways to give) */}
                  {it.children && it.children.length > 0 && (
                    <div ref={nestedContainerRef} className="mt-3 relative pl-4">
                      {/* Nested grandchildren list (connectors drawn via SVG overlay) */}
                      <div className="flex flex-col gap-4">
                        {it.children.map((child, idx) => (
                          <div key={child.href} className="relative" ref={idx === 0 ? nestedFirstRef : idx === it.children!.length - 1 ? nestedLastRef : undefined}>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-primary" />
                            <div className="ml-4 inline-block">
                              <CardLink item={child} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* SVG overlay: unified branch drawing to match reference (attach under pill to rail, then vertical at railX) */}
          <svg className="pointer-events-none absolute inset-0 w-full h-full z-0" aria-hidden="true" shapeRendering="crispEdges">
            {(() => {
              // Start the vertical at (or slightly above) the pill bottom to avoid any visible gap.
              const parentTapY = Math.round(coords.parentBottomY) - 1
              // Connect nested branch slightly above the first child and slightly below the last child, as per reference
              const nestedTopConnectY = coords.nestedTop > 0 ? Math.max(parentTapY + 4, Math.round(coords.nestedTop - 12)) : 0
              const nestedBottomConnectY = coords.nestedBottom > 0 ? Math.round(coords.nestedBottom + 12) : 0
              return (
                <>
                  {/* Attach from parent left edge to rail under the pill (avoids top right-turn) */}
                  <line x1={coords.parentLeftX} x2={coords.railX} y1={parentTapY} y2={parentTapY} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                  {/* Straight vertical at railX from pill to the connection Y; if last item has children, stop at its center */}
                  {(() => {
                    const lastHasChildren = !!(group.items[group.items.length - 1]?.children && group.items[group.items.length - 1]!.children!.length > 0)
                    const stopY = lastHasChildren && coords.nestedParentMidY > 0 ? coords.nestedParentMidY : coords.railBottom
                    return (
                      <line x1={coords.railX} x2={coords.railX} y1={parentTapY} y2={stopY} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                    )
                  })()}
                  {/* Bracket caps at top and (optionally) bottom of the children span */}
                  {coords.railBottom - coords.railTop > 1 && (
                    <>
                      <line x1={coords.railX} x2={coords.railX + 10} y1={coords.railTop} y2={coords.railTop} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                      {/* Skip bottom cap if the last item has nested children (e.g., 'Other ways to give') */}
                      {!(group.items[group.items.length - 1]?.children && group.items[group.items.length - 1]!.children!.length > 0) && (
                        <line x1={coords.railX} x2={coords.railX + 10} y1={coords.railBottom} y2={coords.railBottom} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                      )}
                    </>
                  )}

                  {/* Nested sub-branch and main-rail connection into the center of the parent card */}
                  {coords.nestedBottom > 0 && coords.nestedParentBottomY > 0 && (
                    <>
                      {/* Main rail to the exact center of the parent card */}
                      <line x1={coords.railX} x2={coords.nestedParentLeftX} y1={coords.nestedParentMidY} y2={coords.nestedParentMidY} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                      {/* Short attach from card center into nested vertical rail just right of it */}
                      <line x1={coords.nestedParentLeftX} x2={coords.nestedX} y1={coords.nestedParentMidY} y2={coords.nestedParentMidY} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                      {/* Nested vertical rail starting under the parent card and spanning all grandchildren */}
                      <line x1={coords.nestedX} x2={coords.nestedX} y1={coords.nestedParentMidY} y2={coords.nestedBottom} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                      {/* Bottom cap for nested rail */}
                      <line x1={coords.nestedX} x2={coords.nestedX + 10} y1={coords.nestedBottom} y2={coords.nestedBottom} stroke="#ff7518" strokeWidth={2} strokeLinecap="square" vectorEffect="non-scaling-stroke" />
                    </>
                  )}
                </>
              )
            })()}
          </svg>
        </>
      )}
    </div>
  )
}

export function Sitemap() {
  return (
    <section id="sitemap" className="py-12 bg-secondary-tint">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-block h-1.5 w-16 bg-primary rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-left text-primary">Sitemap</h2>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Top: Home */}
          <Pill href="/">Home</Pill>
          {/* Connector down from Home (root -> parents) */}
          <div className="h-8 w-[2px] bg-primary" />

          {/* Horizontal connector under Home across all groups (root -> parents) */}
          <div className="relative w-full max-w-7xl pt-6">
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-primary" />

            {/* Category row */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-12 justify-items-center z-10">
              {groups.map((g) => (
                <GroupColumn key={g.title} group={g} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
