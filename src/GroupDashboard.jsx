import React from 'react';
import { Link } from 'react-router-dom';

export default function GroupDashboard({ data }) {
  if (!data) return null;

  const {
    period,
    overview,
    tokenUtilization,
    outliers,
    costSummary,
    agents,
  } = data;

  return (
    <div style={{ padding: '0', background: 'var(--surface-0)' }}>
      <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '24px', fontWeight: '500' }}>
            Agent Performance Report
          </h1>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {period || 'Week of ' + new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '2rem',
        }}>
          {overview && overview.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface-1)',
                border: '0.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1rem',
              }}
            >
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {card.label}
              </p>
              <p style={{
                margin: '0',
                fontSize: '28px',
                fontWeight: '500',
                color: card.alert ? '#e24b4a' : 'var(--text-primary)',
              }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Agent Cards */}
        {agents && agents.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '18px', fontWeight: '500' }}>
              Agents
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {agents.map((agent, idx) => (
                <Link
                  key={idx}
                  to={`/agent/${agent.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: 'var(--surface-1)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)' }}>
                      {agent.name}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Runs</p>
                        <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {agent.runs}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Cache hit</p>
                        <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {agent.cache_hit_rate}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Avg tokens</p>
                        <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {agent.avg_tokens}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Cost</p>
                        <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {agent.cost_cad}
                        </p>
                      </div>
                    </div>
                    <p style={{ margin: '1rem 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Click to view details →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Token Utilization */}
        {tokenUtilization && (
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
              Token utilization
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}>
              {tokenUtilization.map((section, idx) => (
                <div key={idx}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {section.title}
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {section.metrics.map((metric, midx) => (
                      <div key={midx}>
                        <p style={{ margin: '0', fontSize: '20px', fontWeight: '500' }}>
                          {metric.value}
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Outliers */}
        {outliers && outliers.length > 0 && (
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
              Top 10 outliers by tokens
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                fontSize: '13px',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '0.5px solid var(--border)' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '8px 0 12px 0',
                      color: 'var(--text-secondary)',
                      fontWeight: '400',
                    }}>
                      Encounter hash
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '8px 0 12px 0',
                      color: 'var(--text-secondary)',
                      fontWeight: '400',
                    }}>
                      Total tokens
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '8px 0 12px 0',
                      color: 'var(--text-secondary)',
                      fontWeight: '400',
                    }}>
                      API calls
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '8px 0 12px 0',
                      color: 'var(--text-secondary)',
                      fontWeight: '400',
                    }}>
                      Agent
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '8px 0 12px 0',
                      color: 'var(--text-secondary)',
                      fontWeight: '400',
                    }}>
                      Clinic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {outliers.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '0.5px solid var(--border)' }}>
                      <td style={{
                        padding: '12px 0',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                      }}>
                        {row.encounter_hash}
                      </td>
                      <td style={{ padding: '12px 0', color: 'var(--text-primary)' }}>
                        {row.total_tokens.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 0', color: 'var(--text-primary)' }}>
                        {row.api_calls_count}
                      </td>
                      <td style={{ padding: '12px 0', color: 'var(--text-primary)' }}>
                        {row.agent_name}
                      </td>
                      <td style={{ padding: '12px 0', color: 'var(--text-primary)' }}>
                        {row.account_domain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cost Summary */}
        {costSummary && (
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
              Cost summary (Gemini 2.5 Flash)
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '1.5rem',
            }}>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Weekly cost
                </p>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: '500' }}>
                  {costSummary.weekly_cost_cad}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {costSummary.weekly_cost_usd}
                </p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Cost per encounter
                </p>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: '500' }}>
                  {costSummary.cost_per_encounter_cad}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {costSummary.cost_per_encounter_usd} baseline
                </p>
              </div>
            </div>
            {costSummary.by_clinic && costSummary.by_clinic.length > 0 && (
              <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1.5rem' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Cost breakdown by clinic (top 5)
                </p>
                <table style={{
                  width: '100%',
                  fontSize: '13px',
                  borderCollapse: 'collapse',
                }}>
                  <tbody>
                    {costSummary.by_clinic.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '0.5px solid var(--border)' }}>
                        <td style={{ padding: '8px 0', color: 'var(--text-primary)' }}>
                          {row.account_domain}
                        </td>
                        <td style={{ padding: '8px 0', textAlign: 'right', color: 'var(--text-primary)' }}>
                          {row.cost_cad}
                        </td>
                        <td style={{
                          padding: '8px 0 8px 12px',
                          textAlign: 'right',
                          color: 'var(--text-secondary)',
                          fontSize: '12px',
                        }}>
                          {row.percentage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
