import { z } from "zod";

type KafkaEvents = {
    MESSAGE_SENT: [{
        messageId: string;
        roomId: string;
        senderId: string;
        content: string;
        timestamp: string;
    }];
    MESSAGE_DELIVERED: [{
        messageId: string;
        roomId: string;
        recipientId: string;
        timestamp: string;
    }];
    MESSAGE_READ: [{
        messageId: string;
        roomId: string;
        readerId: string;
        timestamp: string;
    }];
    ERROR: [error: Error];
};

const KafkaEventsSchema = z.object({
    MESSAGE_SENT: z.tuple([
        z.object({
            messageId: z.string(),
            roomId: z.string(),
            senderId: z.string(),
            content: z.string(),
            timestamp: z.string().datetime(),
        })
    ]),
    MESSAGE_DELIVERED: z.tuple([
        z.object({
            messageId: z.string(),
            roomId: z.string(),
            recipientId: z.string(),
            timestamp: z.string().datetime(),
        })
    ]),
    MESSAGE_READ: z.tuple([
        z.object({
            messageId: z.string(),
            roomId: z.string(),
            readerId: z.string(),
            timestamp: z.string().datetime(),
        })
    ]),
    ERROR: z.any(),
})

export type { KafkaEvents };
export { KafkaEventsSchema };
