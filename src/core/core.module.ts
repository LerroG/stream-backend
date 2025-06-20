import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { AccountModule } from '../modules/auth/account/account.module'
import { SessionModule } from '../modules/auth/session/session.module'

import { getGraphqlConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module'
import { IS_DEV_ENV } from './shared/utils/is-dev.util'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphqlConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule,
		AccountModule,
		SessionModule
	]
})
export class CoreModule {}
