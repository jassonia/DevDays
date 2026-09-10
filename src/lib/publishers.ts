/**
 * Provides read-only access to publisher records for build-time page queries.
 * This module keeps publisher lookups consistent with the rest of the Astro
 * data layer and exposes a single helper for listing publishers by name.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves all publishers in alphabetical order by name.
 *
 * @param db - Database connection used to query the publishers table.
 * @returns A promise that resolves to every publisher record sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows;
}
