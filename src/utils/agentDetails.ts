interface AgentDetail {
  capabilities: Array<{
    title: string;
    description: string;
    details: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
    details: string;
  }>;
}

export function getAgentDetails(agentName: string): AgentDetail {
  const details: Record<string, AgentDetail> = {
    'SmartAnalytics AI': {
      capabilities: [
        {
          title: 'Real-time Data Processing',
          description: 'Process and analyze large datasets in real-time with advanced algorithms',
          details: 'Our real-time processing engine can handle millions of data points per second, utilizing distributed computing and stream processing. Features include data cleaning, normalization, and automated anomaly detection with configurable thresholds and alerts.'
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecast trends and patterns using machine learning models',
          details: 'Leveraging advanced machine learning algorithms including LSTM networks and ensemble methods, our predictive analytics can forecast trends with up to 95% accuracy. Supports both time-series and categorical predictions with automated model selection and optimization.'
        },
        {
          title: 'Custom Visualizations',
          description: 'Generate interactive and customizable data visualizations',
          details: 'Create stunning visualizations using our extensive library of charts, graphs, and dashboards. Supports real-time updates, interactive filtering, and drill-down capabilities. Export options include PNG, SVG, and interactive HTML.'
        },
        {
          title: 'Automated Reporting',
          description: 'Create automated reports with key insights and metrics',
          details: 'Schedule and generate comprehensive reports automatically. Features include customizable templates, natural language insights, and support for multiple export formats including PDF, Excel, and interactive web dashboards.'
        }
      ],
      useCases: [
        {
          title: 'E-commerce Analytics',
          description: 'Real-time sales analysis and customer behavior tracking',
          details: 'A major online retailer implemented SmartAnalytics AI to analyze customer behavior patterns and optimize their product recommendations. The system processes millions of user interactions daily, resulting in a 32% increase in conversion rates and a 45% improvement in customer engagement through personalized product suggestions.'
        },
        {
          title: 'Healthcare Monitoring',
          description: 'Patient data analysis and predictive healthcare insights',
          details: 'A network of hospitals uses SmartAnalytics AI to monitor patient vital signs and predict potential health issues before they become critical. The system analyzes real-time data from IoT devices and historical patient records, helping reduce emergency readmissions by 28% and improving early intervention success rates by 40%.'
        },
        {
          title: 'Supply Chain Optimization',
          description: 'Inventory management and demand forecasting',
          details: 'A global manufacturing company utilizes SmartAnalytics AI to optimize their supply chain operations. The system analyzes historical data, market trends, and real-time inventory levels to predict demand patterns, resulting in a 25% reduction in inventory costs and a 35% improvement in order fulfillment accuracy.'
        }
      ]
    },
    'CodeAssist Pro': {
      capabilities: [
        {
          title: 'Code Analysis',
          description: 'Analyze code quality, complexity, and potential issues',
          details: 'Advanced static code analysis using abstract syntax trees and semantic analysis. Detects code smells, complexity issues, and potential bugs. Supports over 20 programming languages with customizable rule sets and integration with popular IDEs.'
        },
        {
          title: 'Automated Refactoring',
          description: 'Suggest and apply code improvements automatically',
          details: 'Intelligent refactoring suggestions based on best practices and patterns. Supports automated fixes for common issues, code organization, and performance optimizations. Includes preview functionality and batch refactoring capabilities.'
        },
        {
          title: 'Security Scanning',
          description: 'Identify security vulnerabilities and suggest fixes',
          details: 'Comprehensive security analysis including OWASP Top 10 vulnerabilities, dependency checking, and custom security rules. Real-time scanning during development with detailed remediation guidance and priority scoring.'
        },
        {
          title: 'Performance Optimization',
          description: 'Detect and optimize performance bottlenecks',
          details: 'Advanced performance analysis including memory usage, CPU profiling, and algorithmic complexity assessment. Provides specific optimization suggestions with expected impact metrics and benchmarking capabilities.'
        }
      ],
      useCases: [
        {
          title: 'Enterprise Code Review',
          description: 'Automated code quality assessment for large teams',
          details: 'A Fortune 500 technology company integrated CodeAssist Pro into their development workflow, analyzing over 1 million lines of code daily. The system identified critical security vulnerabilities and optimization opportunities, reducing bug reports by 45% and improving code deployment efficiency by 60%.'
        },
        {
          title: 'Legacy Code Modernization',
          description: 'Automated refactoring of legacy systems',
          details: 'A financial institution used CodeAssist Pro to modernize their 15-year-old banking software. The system analyzed the legacy codebase, suggested modern patterns and security improvements, and assisted in the refactoring process, reducing the modernization timeline from 2 years to 8 months while maintaining system stability.'
        },
        {
          title: 'Continuous Security Audit',
          description: 'Real-time security vulnerability detection',
          details: 'A cybersecurity firm implements CodeAssist Pro to continuously audit client codebases. The system performs real-time analysis of code changes, identifying potential security threats before deployment. This resulted in a 75% reduction in security incidents and saved an estimated $2.5M in potential breach costs.'
        }
      ]
    },
    'SecurityGuard AI': {
      capabilities: [
        {
          title: 'Threat Detection',
          description: 'Detect and alert on potential security threats in real-time',
          details: 'Advanced threat detection using machine learning and behavioral analysis. Monitors network traffic, system calls, and application behavior. Features include zero-day threat detection, automated threat classification, and correlation analysis.'
        },
        {
          title: 'Vulnerability Scanning',
          description: 'Continuous scanning for security vulnerabilities',
          details: 'Comprehensive vulnerability assessment including network, application, and configuration scanning. Supports custom vulnerability definitions, automated exploitation testing, and risk scoring based on CVSS.'
        },
        {
          title: 'Compliance Monitoring',
          description: 'Monitor and ensure compliance with security standards',
          details: 'Automated compliance checking for major standards including GDPR, HIPAA, PCI DSS, and ISO 27001. Features include continuous monitoring, automated reporting, and compliance gap analysis with remediation guidance.'
        },
        {
          title: 'Incident Response',
          description: 'Automated incident response and mitigation',
          details: 'Intelligent incident response system with automated containment and mitigation actions. Includes playbook automation, integration with security tools, and detailed forensics capabilities.'
        }
      ],
      useCases: [
        {
          title: 'Financial Services Protection',
          description: 'Real-time fraud detection and prevention',
          details: 'A major banking institution deployed SecurityGuard AI to protect their online banking platform. The system analyzes millions of transactions in real-time, using behavioral patterns to detect fraudulent activities. This implementation prevented over $10M in potential fraud losses and reduced false positives by 60% compared to traditional security systems.'
        },
        {
          title: 'Healthcare Data Security',
          description: 'HIPAA compliance and patient data protection',
          details: 'A healthcare network uses SecurityGuard AI to protect sensitive patient data across 50 facilities. The system monitors data access patterns, ensures HIPAA compliance, and prevents unauthorized access attempts. Since implementation, there have been zero data breaches, and compliance audit times reduced by 70%.'
        },
        {
          title: 'Cloud Infrastructure Security',
          description: 'Continuous cloud security monitoring',
          details: 'A cloud service provider integrated SecurityGuard AI to protect their infrastructure. The system monitors over 100,000 cloud resources in real-time, automatically responding to threats and ensuring compliance. This resulted in a 90% reduction in incident response time and prevented 99.9% of attempted security breaches.'
        }
      ]
    }
  };

  return details[agentName] || {
    capabilities: [],
    useCases: []
  };
}