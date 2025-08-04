import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout('./components/layout/main.tsx', [
        index('./routes/home.tsx'),
        ...prefix("basic", [
            layout('./components/layout/basic-input.tsx', [
                ...prefix("input", [
                    route("text", "./routes/basic/inputs/text-input.tsx"),
                    route("textarea", "./routes/basic/inputs/text-area.tsx"),
                    route("date", "./routes/basic/inputs/date-input.tsx"),
                ]),
                ...prefix("select", [
                   route("one", "./routes/basic/select/select-one.tsx"),
                   route("many", "./routes/basic/select/select-many.tsx"),
                ]),
                ...prefix("file", [
                   route("text", "./routes/basic/files/text.tsx"),
                   route("image-one", "./routes/basic/files/image-single.tsx"),
                   route("image-many", "./routes/basic/files/image-multiple.tsx"),
                ]),
            ])
        ])
    ])
] satisfies RouteConfig;
