package com.example.sentinex;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;
import java.util.List;

public class ReportsAdapter extends RecyclerView.Adapter<ReportsAdapter.ReportViewHolder> {

    private List<Report> reports = new ArrayList<>();

    public void setData(List<Report> reportList) {
        this.reports = reportList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ReportViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.activity_report, parent, false);
        return new ReportViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReportViewHolder holder, int position) {
        Report report = reports.get(position);
        holder.bind(report);
    }

    @Override
    public int getItemCount() {
        return reports.size();
    }

    static class ReportViewHolder extends RecyclerView.ViewHolder {
        TextView descriptionTextView;
        TextView locationTextView;
        TextView timeTextView;

        public ReportViewHolder(@NonNull View itemView) {
            super(itemView);
            descriptionTextView = itemView.findViewById(R.id.textDescription);
            locationTextView = itemView.findViewById(R.id.textLocation);
            timeTextView = itemView.findViewById(R.id.textTime);
        }

        public void bind(Report report) {
            descriptionTextView.setText(report.getDescription());
            locationTextView.setText(report.getLocation());
            timeTextView.setText(report.getTime());
        }
    }
}
