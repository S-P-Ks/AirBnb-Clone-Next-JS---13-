interface IParams {
    lisitingId?: string
}

export default async function getListingById(params: IParams) {
    try {
        const { lisitingId } = params;

        const lisiting = await prisma?.listing.findUnique({
            where: {
                id: lisitingId
            }, include: {
                user: true
            }
        })

        if (!lisiting) {
            return null
        }

        return {
            ...lisiting,
            createdAt: lisiting.createdAt.toISOString(),
            user: {
                ...lisiting.user,
                createdAt: lisiting.user.createdAt.toISOString(),
                updatedAt: lisiting.user.updatedAt.toISOString(),
                emailVerified: lisiting.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error);
    }
}