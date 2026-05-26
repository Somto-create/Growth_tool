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

function AppIcon() {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '150px',
        backgroundColor: '#d61f26',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div style={{ position: 'relative', width: '18px', height: '18px', flexShrink: 0 }}>
        <img src="/dh-logo.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
        <div style={{ position: 'absolute', top: '19.79%', right: '15.63%', bottom: '26.04%', left: '11.46%' }}>
          <img src="/dh-commet.svg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', maxWidth: 'none' }} />
        </div>
      </div>
    </div>
  );
}

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
          /* Collapsed emblem */
          <div style={{ width: '32px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AppIcon />
          </div>
        ) : (
          /* Full wordmark + portal chip */
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', paddingLeft: '4px' }}>
            <div style={{ flex: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0, overflow: 'hidden' }}>
                <AppIcon />
                <span
                  style={{
                    fontSize: '21px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: 'var(--cp-text-color-primary, #141415)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  foodpanda
                </span>
              </div>
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
                      {/* icon body — dot badge (active only) + centred icon */}
                      <div
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          borderRadius: '8px',
                          flexShrink: 0,
                        }}
                      >
                        {isActive && (
                          <span style={{ position: 'absolute', top: 0, left: 0 }}>
                            <Indicator size="small" status="branded" />
                          </span>
                        )}
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
