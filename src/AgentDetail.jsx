import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function AgentDetail({ data }) {
  const { agentId } = useParams();
  
  if (!data || !data.agents) return null;

  const agent = data.agents.find(a => a.id === agentId);
  
  if (!agent) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to overview
        </Link>
        <p style={{ color: 'var(--text-primary)' }}>Agent not found</p>
      </div>
    );
  }

  const agentOutliers = agent.outliers || [];
  const agentMetrics = agent.metrics || {};

  return (
    <div style={{ padding: '0', background: 'var(--surface-0)' }}>
      <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', marginBottom: '1rem', display: 'block' }}>
          ← Back to overview
        </Link>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '24px', fontWeight: '500' }}>
            {agent.name}
          </h1>
          <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Week of {data.period || new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Agent Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Runs</p>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: '500', color: 'var(--text-primary)' }}>
              {agent.runs}
            </p>
          </div>
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Encounters</p>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: '500', color: 'var(--text-primary)' }}>
              {agent.encounters}
            </p>
          </div>
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Total suggestions</p>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: '500', color: 'var(--text-primary)' }}>
              {agent.total_suggestions}
            </p>
          </div>
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '1rem',
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Accept rate</p>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: '500', color: 'var(--text-primary)' }}>
              {agent.accept_rate}
            </p>
          </div>
        </div>

        {/* Token Metrics */}
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
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Cache hit rate
              </p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.cache_hit_rate}
              </p>
              {agentMetrics.cache_target && (
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Target: {agentMetrics.cache_target}
                </p>
              )}
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Avg API calls per encounter
              </p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.avg_api_calls}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Avg tokens per encounter
              </p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.avg_tokens}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Total tokens
              </p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.total_tokens}
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion Rates */}
        <div style={{
          background: 'var(--surface-1)',
          border: '0.5px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
            Suggestion breakdown
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
          }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Approved</p>
              <p style={{ margin: '0', fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.approved_suggestions}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Dismissed</p>
              <p style={{ margin: '0', fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.dismissed_suggestions}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Pending</p>
              <p style={{ margin: '0', fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.pending_suggestions}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Errored</p>
              <p style={{ margin: '0', fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.errored_suggestions}
              </p>
            </div>
          </div>
        </div>

        {/* Agent Cost */}
        <div style={{
          background: 'var(--surface-1)',
          border: '0.5px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
            Cost analysis
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Weekly cost</p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.cost_cad}
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                {agent.cost_usd}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Cost per encounter</p>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '500', color: 'var(--text-primary)' }}>
                {agent.cost_per_encounter_cad}
              </p>
            </div>
          </div>
        </div>

        {/* Outliers for this agent */}
        {agentOutliers.length > 0 && (
          <div style={{
            background: 'var(--surface-1)',
            border: '0.5px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '18px', fontWeight: '500' }}>
              Top outliers (this agent)
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
                      Clinic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agentOutliers.map((row, idx) => (
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
                        {row.account_domain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
