// Imports
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'
import * as api from '@opentelemetry/api'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { Resource } from '@opentelemetry/resources'
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';



export function otelSetup() {
  const contextManager = new AsyncHooksContextManager().enable()

  api.context.setGlobalContextManager(contextManager)
  const otel_host = process.env.OTEL_HOST
  const exporter = new OTLPTraceExporter({ url: otel_host || "http://192.168.49.2:4318/v1/traces"});

  const provider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'api',
      [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    }),
  })


  provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getNodeAutoInstrumentations(),
      new PrismaInstrumentation(),
      new WinstonInstrumentation({
        logHook: (span, record) => {
          record['resource.service.name'] = 'api';
        },
      }),
    ],
  })

  provider.register()
}