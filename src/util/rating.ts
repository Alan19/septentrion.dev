export enum Rating {
    Mainstream = 'mainstream',
    General = 'general',
    Sensitive = 'sensitive',
    Mature = 'mature'
}

export function ratingToNumber(rating: Rating): number {
    switch (rating) {
        case Rating.Mainstream:
            return 0;
        case Rating.General:
            return 1;
        case Rating.Sensitive:
            return 2;
        case Rating.Mature:
            return 3;
    }
}