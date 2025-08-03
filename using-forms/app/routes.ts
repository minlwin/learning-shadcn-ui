import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./components/layout/main.tsx', [
        index('./routes/home.tsx'),
        ...prefix("basic", [
            layout('./components/layout/basic-input.tsx', [
                ...prefix("input", [
                    route("text", "./routes/inputs/text-input.tsx"),
                    route("textarea", "./routes/inputs/text-area.tsx"),
                    route("date", "./routes/inputs/date-input.tsx"),
                ])
            ])
        ])
    ])
] satisfies RouteConfig;
