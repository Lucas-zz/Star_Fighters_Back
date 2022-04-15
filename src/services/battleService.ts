import axios from "axios";
import * as fighterRepository from "../repositories/fighterRepository.js";

export async function getAll() {
    const result = await fighterRepository.getAll();

    return result;
}

export async function battle(firstUser: string, secondUser: string) {
    const firstUserRepo = await getUserRepos(firstUser);
    const secondUserRepo = await getUserRepos(secondUser);

    const firstFighter = await getUser(firstUser);
    const secondFighter = await getUser(secondUser);

    const firstUserTotalStars = await getUserTotalStars(firstUserRepo);
    const secondUserTotalStars = await getUserTotalStars(secondUserRepo);

    return getBattleResults(
        firstFighter,
        secondFighter,
        firstUserTotalStars,
        secondUserTotalStars
    )
}

async function getUserRepos(username: string) {
    const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);

    return data;
}

async function getUser(username: string) {
    const user = await fighterRepository.getByUsername(username);

    if (!user) {
        const newFighter = await fighterRepository.create(username);

        return { id: newFighter, username, wins: 0, losses: 0, draws: 0 };
    }

    return user;
}

function getUserTotalStars(fighterRepos: any[]) {
    const totalStars = fighterRepos.map((repo) =>
        repo.stargazers_count
    );

    if (totalStars.length === 0) return 0;

    return totalStars.reduce((current: number, sum: number) =>
        sum + current
    )
}

async function getBattleResults(firstFighter: any, secondFighter: any, firstUserTotalStars: number, secondUserTotalStars: number) {
    if (firstUserTotalStars > secondUserTotalStars) {
        await updateFightersStats(firstFighter.id, secondFighter.id);

        return {
            winner: firstFighter.username,
            loser: secondFighter.username,
            draw: false
        };
    }

    if (firstUserTotalStars < secondUserTotalStars) {
        await updateFightersStats(secondFighter.id, firstFighter.id);

        return {
            winner: secondFighter.username,
            loser: firstFighter.username,
            draw: false
        };
    }

    await updateDrawStats(firstFighter.id, secondFighter.id);

    return {
        winner: null,
        loser: null,
        draw: true
    };
}

async function updateFightersStats(winnedId: number, loserId: number) {
    await fighterRepository.update(winnedId, 1, 0, 0);
    await fighterRepository.update(loserId, 0, 1, 0);
}

async function updateDrawStats(firstFighterId: number, secondFighterId: number) {
    await fighterRepository.update(firstFighterId, 0, 0, 1);
    await fighterRepository.update(secondFighterId, 0, 0, 1);
}