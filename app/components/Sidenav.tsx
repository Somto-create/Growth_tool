'use client';

import React, { useState } from 'react';
import {
  Button,
  Chip,
  Indicator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@deliveryhero/cape-core';
import {
  BellIcon,
  ChevronDownMiniIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
  HelpCircleIcon,
  MegaphoneIcon,
  SwitchAccessShortcutIcon,
  TargetIcon,
} from '@deliveryhero/cape-icons';

const LOGO_URL = 'https://www.figma.com/api/mcp/asset/d0a28bf0-cbfe-48a4-a2e3-2a5b144e4815';
const EMBLEM_SHAPE_URL = 'https://www.figma.com/api/mcp/asset/61c8ec96-4888-4d95-9be9-5654139464b8';
const EMBLEM_PANDA_URL = 'https://www.figma.com/api/mcp/asset/ff803c8e-9b9f-48e4-ae67-0ff9c8a70837';

const EXPANDED_WIDTH = '296px';
const COLLAPSED_WIDTH = '80px';
const ACTIVE_COLOR = '#3a22d5';
const INACTIVE_COLOR = '#141415';

type IconSize = 'small' | 'medium' | 'large' | 'auto';
type NavItem = {
  label: string;
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & { size?: IconSize }>;
};

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Planning',
    items: [{ label: 'Promotions', Icon: MegaphoneIcon }],
  },
  {
    label: 'Management',
    items: [
      { label: 'A/B Experiments', Icon: SwitchAccessShortcutIcon },
      { label: 'Targeting', Icon: TargetIcon },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Get Help', Icon: HelpCircleIcon },
      { label: 'Notifications', Icon: BellIcon },
    ],
  },
];

function GridAppsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

interface SidenavProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidenav({ collapsed, onToggle }: SidenavProps) {
  const [activeItem, setActiveItem] = useState('Promotions');

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        height: '100dvh',
        backgroundColor: 'var(--cp-surface-color-default, #fff)',
        borderRight: '1px solid var(--cp-border-color-low, #e9eaec)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          borderBottom: '1px solid var(--cp-border-color-low, #e9eaec)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
          padding: collapsed ? '32px 24px 16px' : '32px 28px 16px',
          transition: 'padding 0.25s ease',
        }}
      >
        {collapsed ? (
          /* Panda emblem — 32×40 outer, 24×24 inner logo */
          <div style={{ width: '32px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {/* Product logo placeholder: 24×24, overflow hidden */}
            <div style={{ width: '24px', height: '24px', maxWidth: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', position: 'relative', flexShrink: 0 }}>
              {/* Logo: fills placeholder, positions children */}
              <div style={{ flex: '1 0 0', minWidth: '1px', aspectRatio: '1/1', position: 'relative' }}>
                {/* Shape: square, fills full width, vertically centered */}
                <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', aspectRatio: '1/1' }}>
                  <img src={EMBLEM_SHAPE_URL} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
                </div>
                {/* Panda: 72:73 ratio, top 12.5%, bottom 11.46%, horizontally centered */}
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '12.5%', bottom: '11.46%', aspectRatio: '72/73' }}>
                  <img src={EMBLEM_PANDA_URL} alt="foodpanda" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full wordmark + portal chip */
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', paddingLeft: '4px' }}>
            <div style={{ flex: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
              <img src={LOGO_URL} alt="foodpanda" style={{ height: '24px', width: '122px', display: 'block' }} />
            </div>
            <Chip size="medium" startIcon={<GridAppsIcon />} endIcon={<ChevronDownMiniIcon />} />
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        style={{
          flex: 1,
          paddingTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: collapsed ? '20px' : '16px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {/* Section title — expanded only */}
            {!collapsed && (
              <div style={{ padding: '0 20px', marginBottom: '4px' }}>
                <span
                  style={{
                    display: 'block',
                    padding: '0 8px',
                    height: '24px',
                    lineHeight: '24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--cp-text-color-tertiary, #6c6d73)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {section.label}
                </span>
              </div>
            )}

            {/* Items */}
            {section.items.map((item) => {
              const isActive = activeItem === item.label;

              return collapsed ? (
                /* ── Collapsed item ── */
                <div key={item.label} style={{ position: 'relative', padding: '4px 24px' }}>
                  {/* Left bar — vertically centred */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: '24px',
                        width: '2px',
                        backgroundColor: ACTIVE_COLOR,
                        borderRadius: '4px',
                      }}
                    />
                  )}

                  <Tooltip placement="right">
                    <TooltipTrigger
                      onClick={() => setActiveItem(item.label)}
                      style={{
                        /* reset button defaults */
                        appearance: 'none',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        /* full-width centre */
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {/* icon body: dot (if active) + icon */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '16px',
                          padding: '4px',
                          borderRadius: '8px',
                          flexShrink: 0,
                        }}
                      >
                        {isActive && <Indicator size="small" status="branded" />}
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                          }}
                        >
                          <item.Icon size="medium" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{item.label}</TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                /* ── Expanded item ── */
                <div key={item.label} style={{ position: 'relative', padding: '0 20px' }}>
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        bottom: '8px',
                        width: '2px',
                        backgroundColor: ACTIVE_COLOR,
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveItem(item.label)}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveItem(item.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                      }}
                    >
                      <item.Icon size="medium" />
                    </div>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                        whiteSpace: 'nowrap',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div
        style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--cp-border-color-low, #e9eaec)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
          flexShrink: 0,
        }}
      >
        <Button
          variant="tertiary"
          size="small"
          startIcon={collapsed ? <DoubleChevronRightIcon /> : <DoubleChevronLeftIcon />}
          onClick={onToggle}
        />
      </div>
    </aside>
  );
}
